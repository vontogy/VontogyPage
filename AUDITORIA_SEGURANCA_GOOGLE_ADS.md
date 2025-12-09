# 🔒 RELATÓRIO DE AUDITORIA DE SEGURANÇA - GOOGLE ADS
## Análise de "Site Comprometido"

**Data da Auditoria:** $(date)  
**Projeto:** VontogyPages  
**Objetivo:** Identificar causas de reprovação "Site Comprometido" no Google Ads

---

## 📋 SUMÁRIO EXECUTIVO

Esta auditoria identificou **7 pontos críticos** e **5 melhorias recomendadas** que podem estar causando a reprovação do Google Ads. Os principais riscos estão relacionados a:

1. **URLs com parâmetros codificados (Base64)** - Pode ser interpretado como ofuscação
2. **Falta de headers de segurança** - Ausência de CSP, X-Frame-Options, etc.
3. **CORS permissivo** - Permite requisições de qualquer origem
4. **URLs malformados** - Dupla barra (`//`) em links externos
5. **Links para domínios externos** - Múltiplos domínios de terceiros

---

## 🚨 PROBLEMAS CRÍTICOS IDENTIFICADOS

### 1. ⚠️ **URLs com Parâmetros Codificados (Base64) - ALTO RISCO**

**Arquivo:** `client/src/pages/home.tsx`  
**Linhas:** 326, 346, 364

**Trecho Suspeito:**
```typescript
buyNowUrl="https://www.checkout-ds24.com/product/609911?_ga=1048192037.1765190178&_b=NDkwMzM1O215ZmVtaXBybzI0LmNvbS90ZXh0LnBocDt1bmRlZmluZWQ7dGV4dDs1OzE1ODtmZTt1bmRlZmluZWQ%3D&aff=techlf"
```

**Motivo do Risco:**
- O parâmetro `_b` contém dados codificados em Base64 (URL-encoded)
- O Google pode interpretar isso como **ofuscação de código** ou tentativa de esconder redirecionamentos
- Parâmetros codificados são frequentemente usados por malware para esconder payloads
- O Google Ads tem políticas rígidas contra ofuscação de conteúdo

**Decodificação do parâmetro `_b`:**
```
NDkwMzM1O215ZmVtaXBybzI0LmNvbS90ZXh0LnBocDt1bmRlZmluZWQ7dGV4dDs1OzE1ODtmZTt1bmRlZmluZWQ=
```
Decodificado (Base64): `490335;myfemipro24.com/text.php;undefined;text;5;158;fe;undefined`

**Sugestão de Correção:**
1. **Remover parâmetros codificados** ou usar parâmetros legíveis
2. Se necessário manter tracking, usar parâmetros claros como `?product_id=609911&affiliate=techlf&price=158`
3. Documentar o propósito de cada parâmetro
4. Considerar usar URLs curtas do próprio domínio que redirecionam para o checkout

---

### 2. ⚠️ **Falta de Headers de Segurança - ALTO RISCO**

**Arquivo:** `server/index.ts`  
**Linhas:** 1-71

**Trecho Suspeito:**
```typescript
// Nenhum header de segurança configurado
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
```

**Motivo do Risco:**
- **Ausência de Content-Security-Policy (CSP)**: Permite injeção de scripts maliciosos
- **Ausência de X-Frame-Options**: Permite que o site seja embedado em iframes (risco de clickjacking)
- **Ausência de X-Content-Type-Options**: Permite MIME type sniffing
- **Ausência de Strict-Transport-Security**: Não força HTTPS
- **Ausência de Referrer-Policy**: Vaza informações de referência
- O Google pode interpretar a falta de headers como **site vulnerável ou comprometido**

**Sugestão de Correção:**
Adicionar middleware de segurança no `server/index.ts`:

```typescript
import helmet from 'helmet';

// Adicionar após app.use(express.json())
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"], // Ajustar conforme necessário
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'", "data:"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
  crossOriginEmbedderPolicy: false, // Ajustar se necessário
}));
```

Ou configurar manualmente:

```typescript
app.use((req, res, next) => {
  // Content Security Policy
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none';"
  );
  
  // X-Frame-Options
  res.setHeader("X-Frame-Options", "DENY");
  
  // X-Content-Type-Options
  res.setHeader("X-Content-Type-Options", "nosniff");
  
  // Strict-Transport-Security
  res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  
  // Referrer-Policy
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  
  // Permissions-Policy
  res.setHeader("Permissions-Policy", "geolocation=(), microphone=(), camera=()");
  
  next();
});
```

---

### 3. ⚠️ **CORS Excessivamente Permissivo - MÉDIO RISCO**

**Arquivo:** `server/index.ts`  
**Linhas:** 18-29

**Trecho Suspeito:**
```typescript
app.use((req, res, next) => {
  const origin = req.headers.origin;
  res.setHeader("Access-Control-Allow-Origin", origin || "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  // ...
});
```

**Motivo do Risco:**
- Permite requisições de **qualquer origem** (`*`)
- Combinado com `credentials: true`, isso é uma **vulnerabilidade de segurança crítica**
- O Google pode interpretar isso como site vulnerável a ataques CSRF
- Permite que sites maliciosos façam requisições autenticadas ao seu servidor

**Sugestão de Correção:**
```typescript
const allowedOrigins = [
  'https://seudominio.com',
  'https://www.seudominio.com',
  // Adicionar apenas domínios confiáveis
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
  } else {
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

### 4. ⚠️ **URLs Malformados com Dupla Barra - BAIXO/MÉDIO RISCO**

**Arquivo:** `client/src/pages/home.tsx`  
**Linhas:** 491-497, 502, 529

**Trecho Suspeito:**
```typescript
<a href="https://myfemipro24.com//help/contact-us.php" ...>
<a href="https://myfemipro24.com//help/references.php" ...>
<a href="https://myfemipro24.com//help/terms.php" ...>
// ... múltiplas ocorrências com "//"
```

**Motivo do Risco:**
- URLs com `//` duplo podem ser interpretados como **protocolo relativo** em alguns contextos
- Pode causar redirecionamentos inesperados
- Indica falta de atenção aos detalhes, o que pode preocupar o Google
- Alguns scanners de segurança sinalizam isso como potencial problema

**Sugestão de Correção:**
Substituir todas as ocorrências de `https://myfemipro24.com//` por `https://myfemipro24.com/`:

```typescript
// ❌ ERRADO
href="https://myfemipro24.com//help/contact-us.php"

// ✅ CORRETO
href="https://myfemipro24.com/help/contact-us.php"
```

---

### 5. ⚠️ **Uso de dangerouslySetInnerHTML - BAIXO RISCO (Verificado)**

**Arquivo:** `client/src/components/ui/chart.tsx`  
**Linhas:** 79-97

**Trecho:**
```typescript
<style
  dangerouslySetInnerHTML={{
    __html: Object.entries(THEMES)
      .map(([theme, prefix]) => `...`)
      .join("\n"),
  }}
/>
```

**Análise:**
- ✅ **USO LEGÍTIMO**: O conteúdo é gerado internamente, não vem de fonte externa
- ✅ **SANITIZAÇÃO**: Não há entrada do usuário ou dados externos
- ✅ **CONTEXTO**: É apenas CSS inline para temas de gráficos
- **RISCO:** BAIXO - Não representa ameaça, mas pode ser melhorado

**Sugestão de Melhoria (Opcional):**
Considerar usar CSS-in-JS ou classes CSS dinâmicas em vez de `dangerouslySetInnerHTML`:

```typescript
// Alternativa mais segura
const styleContent = Object.entries(THEMES)
  .map(([theme, prefix]) => `...`)
  .join("\n");

return (
  <style id={chartId}>
    {styleContent}
  </style>
);
```

---

### 6. ⚠️ **Múltiplos Domínios Externos - BAIXO/MÉDIO RISCO**

**Arquivo:** `client/src/pages/home.tsx`

**Domínios Externos Identificados:**
1. `https://www.digistore24.com` - Processador de pagamento
2. `https://www.checkout-ds24.com` - Checkout externo
3. `https://myfemipro24.com` - Domínio do vendor (múltiplos links)

**Motivo do Risco:**
- Múltiplos redirecionamentos para domínios externos podem ser vistos como **cloaking**
- Se algum desses domínios estiver na blacklist do Google, seu site será penalizado
- Links para domínios desconhecidos podem ser interpretados como **phishing** ou **malware**

**Sugestão de Correção:**
1. **Verificar reputação dos domínios:**
   - Use ferramentas como: Google Safe Browsing, VirusTotal, Sucuri SiteCheck
   - Verifique se os domínios estão na blacklist do Google

2. **Adicionar rel="sponsored" ou rel="nofollow":**
   - ✅ Já implementado corretamente na maioria dos links
   - Verificar se todos os links externos têm esses atributos

3. **Considerar usar páginas intermediárias:**
   - Criar páginas próprias que redirecionam para o checkout
   - Isso reduz a exposição direta a domínios externos

---

### 7. ⚠️ **Falta de Validação de Fetch Requests - BAIXO RISCO**

**Arquivo:** `client/src/lib/queryClient.ts`  
**Linhas:** 15-23, 32-34

**Trecho:**
```typescript
const res = await fetch(url, {
  method,
  headers: data ? { "Content-Type": "application/json" } : {},
  body: data ? JSON.stringify(data) : undefined,
  credentials: "include",
});
```

**Análise:**
- ✅ **USO LEGÍTIMO**: Fetch para API própria
- ⚠️ **RISCO**: Se `url` vier de fonte externa não validada, pode ser explorado
- ⚠️ **CREDENTIALS**: `credentials: "include"` pode vazar cookies se usado com URLs externos

**Sugestão de Melhoria:**
```typescript
// Validar que a URL é do mesmo domínio
function isValidUrl(url: string): boolean {
  try {
    const urlObj = new URL(url, window.location.origin);
    return urlObj.origin === window.location.origin;
  } catch {
    return false;
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  // Validar URL antes de fazer requisição
  if (!isValidUrl(url)) {
    throw new Error("Invalid URL: Only same-origin requests are allowed");
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

## ✅ PONTOS POSITIVOS IDENTIFICADOS

1. ✅ **Sem uso de `eval()`** - Nenhuma ocorrência encontrada
2. ✅ **Sem `document.write()`** - Nenhuma ocorrência encontrada
3. ✅ **setTimeout usa função, não string** - Uso correto em `use-toast.ts`
4. ✅ **Sem ofuscação de código** - Nenhum padrão `_0x` ou variáveis ofuscadas
5. ✅ **Sem detecção de User-Agent** - Nenhuma lógica de cloaking baseada em UA
6. ✅ **HTML limpo** - `index.html` não contém scripts inline suspeitos
7. ✅ **Links externos com atributos corretos** - `rel="nofollow"` e `rel="sponsored"` implementados
8. ✅ **Sem iframes suspeitos** - Nenhum iframe de domínios externos

---

## 📊 RESUMO DE RISCOS

| Risco | Severidade | Prioridade | Status |
|-------|-----------|------------|--------|
| URLs com parâmetros Base64 | 🔴 ALTA | 🔥 CRÍTICA | ⚠️ Requer ação imediata |
| Falta de headers de segurança | 🔴 ALTA | 🔥 CRÍTICA | ⚠️ Requer ação imediata |
| CORS permissivo | 🟡 MÉDIA | ⚡ ALTA | ⚠️ Requer correção |
| URLs malformados (//) | 🟡 MÉDIA | 📋 MÉDIA | ⚠️ Corrigir |
| Múltiplos domínios externos | 🟡 MÉDIA | 📋 MÉDIA | ✅ Monitorar |
| dangerouslySetInnerHTML | 🟢 BAIXA | 📝 BAIXA | ✅ Aceitável |
| Validação de fetch | 🟢 BAIXA | 📝 BAIXA | ✅ Melhorar |

---

## 🛠️ PLANO DE AÇÃO RECOMENDADO

### Fase 1: Correções Críticas (Imediato)
1. ✅ **Remover/Simplificar parâmetros Base64** nos URLs de checkout
2. ✅ **Implementar headers de segurança** no servidor Express
3. ✅ **Corrigir CORS** para permitir apenas origens confiáveis
4. ✅ **Corrigir URLs malformados** (remover `//` duplo)

### Fase 2: Melhorias (Curto Prazo)
5. ✅ **Validar URLs** nas requisições fetch
6. ✅ **Verificar reputação** dos domínios externos
7. ✅ **Implementar Content Security Policy** mais restritiva

### Fase 3: Monitoramento (Contínuo)
8. ✅ **Monitorar logs** do servidor para requisições suspeitas
9. ✅ **Verificar regularmente** se domínios externos estão na blacklist
10. ✅ **Testar site** com Google Search Console e Safe Browsing

---

## 🔍 FERRAMENTAS DE VERIFICAÇÃO RECOMENDADAS

1. **Google Safe Browsing:**
   - https://transparencyreport.google.com/safe-browsing/search

2. **Google Search Console:**
   - Verificar problemas de segurança reportados

3. **Security Headers:**
   - https://securityheaders.com/

4. **Mozilla Observatory:**
   - https://observatory.mozilla.org/

5. **VirusTotal:**
   - Verificar reputação de domínios externos

---

## 📝 NOTAS ADICIONAIS

### Sobre os Parâmetros Base64
Os parâmetros `_b` nos URLs do checkout parecem ser de tracking do DigiStore24. Embora legítimos, o Google pode interpretá-los como ofuscação. Considere:
- Usar URLs mais limpos se possível
- Documentar o propósito dos parâmetros
- Verificar se o DigiStore24 oferece URLs sem esses parâmetros

### Sobre os Headers de Segurança
A implementação de headers de segurança é **essencial** para passar na verificação do Google Ads. Sites sem CSP adequado são frequentemente sinalizados como comprometidos.

### Sobre o CORS
O CORS permissivo é uma vulnerabilidade real que pode ser explorada. Mesmo que não seja a causa direta da reprovação, corrigi-lo melhora a segurança geral do site.

---

## ✅ CHECKLIST DE CORREÇÃO

- [ ] Remover/simplificar parâmetros Base64 dos URLs
- [ ] Implementar helmet ou headers de segurança manualmente
- [ ] Configurar CORS para origens específicas
- [ ] Corrigir todas as URLs com `//` duplo
- [ ] Adicionar validação de URLs nas requisições fetch
- [ ] Verificar reputação dos domínios externos
- [ ] Testar site com Security Headers
- [ ] Submeter para reavaliação no Google Ads
- [ ] Monitorar Google Search Console para novos problemas

---

**Relatório gerado por:** Especialista Sênior em Segurança Web e Compliance do Google Ads  
**Próxima revisão recomendada:** Após implementação das correções críticas

