# 🔧 CORREÇÕES IMEDIATAS - IMPLEMENTAÇÃO PRÁTICA

Este arquivo contém as correções práticas que devem ser implementadas imediatamente para resolver a reprovação do Google Ads.

---

## 1. 🚨 CORREÇÃO CRÍTICA: Headers de Segurança

### Arquivo: `server/index.ts`

**Adicionar após a linha 14:**

```typescript
// Security Headers
app.use((req, res, next) => {
  // Content Security Policy
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: https:; " +
    "font-src 'self' data:; " +
    "connect-src 'self' https://www.digistore24.com https://www.checkout-ds24.com https://myfemipro24.com; " +
    "frame-src 'none'; " +
    "object-src 'none'; " +
    "base-uri 'self'; " +
    "form-action 'self' https://www.checkout-ds24.com; " +
    "upgrade-insecure-requests;"
  );
  
  // X-Frame-Options
  res.setHeader("X-Frame-Options", "DENY");
  
  // X-Content-Type-Options
  res.setHeader("X-Content-Type-Options", "nosniff");
  
  // Strict-Transport-Security (apenas em HTTPS)
  if (req.secure || req.headers['x-forwarded-proto'] === 'https') {
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  }
  
  // Referrer-Policy
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  
  // Permissions-Policy
  res.setHeader("Permissions-Policy", "geolocation=(), microphone=(), camera=()");
  
  next();
});
```

---

## 2. 🚨 CORREÇÃO CRÍTICA: CORS Restritivo

### Arquivo: `server/index.ts`

**Substituir as linhas 18-29 por:**

```typescript
// CORS configuration - Restrictive
const allowedOrigins = [
  process.env.ALLOWED_ORIGIN || 'https://seudominio.com',
  // Adicionar apenas domínios confiáveis aqui
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  // Permitir apenas origens na whitelist
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
  } else if (process.env.NODE_ENV === "development") {
    // Em desenvolvimento, permitir localhost
    if (origin && origin.includes("localhost")) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Access-Control-Allow-Credentials", "true");
    }
  } else {
    // Em produção, negar requisições de origens não autorizadas
    res.setHeader("Access-Control-Allow-Origin", "null");
    res.setHeader("Access-Control-Allow-Credentials", "false");
  }
  
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});
```

---

## 3. 🚨 CORREÇÃO CRÍTICA: URLs Malformados

### Arquivo: `client/src/pages/home.tsx`

**Substituir todas as ocorrências de `https://myfemipro24.com//` por `https://myfemipro24.com/`**

**Linhas afetadas:** 491, 492, 493, 494, 495, 496, 497, 502, 529

**Exemplo de correção:**

```typescript
// ❌ ANTES
<a href="https://myfemipro24.com//help/contact-us.php" ...>

// ✅ DEPOIS
<a href="https://myfemipro24.com/help/contact-us.php" ...>
```

**Buscar e substituir:**
- `https://myfemipro24.com//` → `https://myfemipro24.com/`

---

## 4. ⚠️ CORREÇÃO IMPORTANTE: Simplificar URLs de Checkout

### Arquivo: `client/src/pages/home.tsx`

**Opção 1: Usar URLs mais limpos (se possível)**

Se o DigiStore24 permitir, usar URLs sem o parâmetro `_b` codificado:

```typescript
// ❌ ANTES (com parâmetro Base64)
buyNowUrl="https://www.checkout-ds24.com/product/609911?_ga=1048192037.1765190178&_b=NDkwMzM1O215ZmVtaXBybzI0LmNvbS90ZXh0LnBocDt1bmRlZmluZWQ7dGV4dDs1OzE1ODtmZTt1bmRlZmluZWQ%3D&aff=techlf"

// ✅ DEPOIS (simplificado)
buyNowUrl="https://www.checkout-ds24.com/product/609911?aff=techlf&product_id=609911"
```

**Opção 2: Criar página intermediária de redirecionamento**

Criar uma rota no servidor que redireciona para o checkout:

```typescript
// server/index.ts
app.get('/checkout/:productId', (req, res) => {
  const { productId } = req.params;
  const affiliateId = 'techlf';
  
  // URL limpo sem parâmetros codificados
  const checkoutUrl = `https://www.checkout-ds24.com/product/${productId}?aff=${affiliateId}`;
  
  res.redirect(301, checkoutUrl);
});
```

E no frontend:

```typescript
// client/src/pages/home.tsx
buyNowUrl="/checkout/609911"  // URL interno que redireciona
```

---

## 5. ✅ MELHORIA: Validação de URLs

### Arquivo: `client/src/lib/queryClient.ts`

**Adicionar função de validação antes da função `apiRequest`:**

```typescript
function isValidUrl(url: string): boolean {
  try {
    // Se for URL relativa, é válida
    if (url.startsWith('/')) {
      return true;
    }
    
    const urlObj = new URL(url, window.location.origin);
    
    // Permitir apenas requisições para o mesmo domínio
    return urlObj.origin === window.location.origin;
  } catch {
    return false;
  }
}
```

**Modificar a função `apiRequest`:**

```typescript
export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  // Validar URL
  if (!isValidUrl(url)) {
    throw new Error(`Invalid URL: ${url}. Only same-origin requests are allowed.`);
  }
  
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}
```

---

## 6. ✅ VERIFICAÇÃO: Dependências do package.json

### Verificar se há dependências suspeitas

Execute o comando para verificar vulnerabilidades:

```bash
npm audit
```

Se houver vulnerabilidades críticas, corrija com:

```bash
npm audit fix
```

---

## 7. ✅ TESTE: Verificar Headers de Segurança

Após implementar as correções, teste o site em:

1. **Security Headers:** https://securityheaders.com/
2. **Mozilla Observatory:** https://observatory.mozilla.org/

---

## 📋 CHECKLIST DE IMPLEMENTAÇÃO

- [ ] Implementar headers de segurança no `server/index.ts`
- [ ] Corrigir configuração de CORS
- [ ] Corrigir todas as URLs com `//` duplo
- [ ] Simplificar URLs de checkout ou criar redirecionamento
- [ ] Adicionar validação de URLs no `queryClient.ts`
- [ ] Executar `npm audit` e corrigir vulnerabilidades
- [ ] Testar headers em securityheaders.com
- [ ] Fazer build e deploy
- [ ] Verificar site no Google Safe Browsing
- [ ] Submeter para reavaliação no Google Ads

---

## 🚀 ORDEM DE IMPLEMENTAÇÃO RECOMENDADA

1. **Primeiro:** Headers de segurança (mais crítico)
2. **Segundo:** Corrigir URLs malformados (rápido)
3. **Terceiro:** CORS restritivo
4. **Quarto:** Simplificar URLs de checkout
5. **Quinto:** Validação de URLs (melhoria)

---

## ⚠️ NOTA IMPORTANTE

Após implementar as correções:

1. **Teste localmente** antes de fazer deploy
2. **Verifique se o site ainda funciona** corretamente
3. **Monitore logs** do servidor após o deploy
4. **Aguarde 24-48 horas** antes de solicitar reavaliação no Google Ads
5. **Documente as mudanças** para referência futura

---

**Última atualização:** $(date)

