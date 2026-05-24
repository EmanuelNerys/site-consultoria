# Formulário de Contato - Consultoria DevOps, SRE e Cloud Architecture

Um componente profissional e moderno de formulário de contato desenvolvido com **Next.js 14+**, **React**, **TypeScript** e **Tailwind CSS**. Perfeito para capturar leads qualificados em consultoria técnica.

## 🎯 Características Principais

✅ **Design Premium Dark Mode** - Tons de cinza escuro com detalhes em cyan e purple neon  
✅ **Validação em Tempo Real** - Validação de cliente completa com feedback visual  
✅ **Integração com API** - POST para `/api/contact` com tratamento de erros  
✅ **Estados Visuais** - Loading, sucesso e erro com mensagens atraentes  
✅ **Componentes Acessíveis** - Semântica HTML correta e ARIA labels  
✅ **Responsivo** - Desktop e mobile totalmente otimizado  
✅ **TypeScript Completo** - Tipagem forte em todo o código  
✅ **Sidebar de Credibilidade** - Seção lateral com benefícios e especialidades  

## 📁 Estrutura de Arquivos

```
src/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts          # Endpoint POST para receber formulários
│   ├── layout.tsx                # Layout raiz com metadata
│   ├── page.tsx                  # Página principal com ContactForm
│   └── globals.css               # Estilos globais
├── components/
│   └── ContactForm.tsx           # Componente principal do formulário
└── ...
```

## 🛠️ Campos do Formulário

| Campo | Tipo | Obrigatório | Validação |
|-------|------|-------------|-----------|
| Nome Completo | Text | ✅ | Não vazio |
| E-mail Corporativo | Email | ✅ | Formato de email válido |
| Nome da Empresa | Text | ❌ | Nenhuma |
| Gargalo Principal | Select | ✅ | 5 opções pré-definidas |
| Detalhes do Projeto | Textarea | ✅ | Mínimo 10 caracteres |

## 📋 Opções do Dropdown "Gargalo Principal"

1. **Custos Cloud Altos (FinOps)** - `finops`
2. **Lentidão nos Deploys (CI/CD)** - `cicd`
3. **Instabilidade/Quedas no Sistema** - `stability`
4. **Migração para Nuvem** - `migration`
5. **Outros** - `other`

## 🎨 Design & Cores

```css
/* Paleta de Cores */
Background Principal: bg-slate-950 (cinza muito escuro)
Secundário: bg-slate-900
Card Background: bg-slate-800/50 (com transparência)
Border: border-slate-700
Accent Primário: cyan-400 (#06b6d4)
Accent Secundário: purple-500 (#a855f7)
Texto Principal: text-white
Texto Secundário: text-gray-400
```

## 🚀 Como Usar

### 1. Instalação de Dependências

```bash
npm install
npm install lucide-react  # Já instalado no projeto
```

### 2. Usar o Componente na Página

```tsx
import ContactForm from '@/components/ContactForm';

export default function Home() {
  return <ContactForm />;
}
```

### 3. Configurar a API

O arquivo `src/app/api/contact/route.ts` já existe e:
- ✅ Valida os dados recebidos
- ✅ Retorna erros apropriados
- ✅ Registra as submissões no console

**Para produção, você precisa:**

```typescript
// Exemplo: Integrar com Banco de Dados
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  // ... validação existente ...
  
  // Salvar no banco
  const contact = await db.contact.create({
    data: {
      fullName: body.fullName,
      email: body.email,
      company: body.company,
      bottleneck: body.bottleneck,
      message: body.message,
    },
  });
  
  // Enviar email de confirmação
  await sendEmail({
    to: body.email,
    subject: 'Recebemos sua mensagem',
    template: 'contact-confirmation',
  });
  
  return NextResponse.json({ success: true });
}
```

## 📝 Anatomia do Componente

### ContactForm.tsx
```typescript
// Estado do formulário
const [formData, setFormData] = useState<FormData>({...})
const [status, setStatus] = useState<FormStatus>({ type: 'idle' })
const [errors, setErrors] = useState<Partial<FormData>>({})

// Funções principais
const validateForm = (): boolean
const handleChange = (e: ChangeEvent)
const handleSubmit = async (e: FormEvent)
```

### Estados Disponíveis
- `idle` - Estado inicial
- `loading` - Enviando formulário
- `success` - Enviado com sucesso
- `error` - Erro na submissão

## 🔄 Fluxo de Submissão

```
1. Usuário preenche o formulário
   ↓
2. Clica em "Solicitar Análise Gratuita"
   ↓
3. Validação de cliente
   ├─ Se inválido: mostrar erros
   └─ Se válido: prosseguir
   ↓
4. POST para /api/contact com dados JSON
   ↓
5. Servidor valida novamente
   ├─ Se inválido: retorna erro 400
   └─ Se válido: processa dados
   ↓
6. Mostrar resultado
   ├─ Sucesso: mensagem verde + resetar form
   └─ Erro: mensagem vermelha + manter dados
```

## 🎯 Validações Implementadas

### Cliente (ContactForm.tsx)
- ✅ Nome: não vazio
- ✅ Email: formato válido com regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- ✅ Mensagem: mínimo 10 caracteres
- ✅ Feedback em tempo real enquanto o usuário digita

### Servidor (route.ts)
- ✅ Campos obrigatórios presentes
- ✅ Formato de email válido
- ✅ Comprimento mínimo da mensagem
- ✅ Tratamento de exceções

## 💫 Efeitos Visuais

### Hover & Focus
```css
/* Input focus */
focus:border-cyan-400
focus:ring-2 focus:ring-cyan-400/20

/* Button hover */
hover:from-cyan-300 hover:to-purple-400

/* Disabled state */
disabled:opacity-50 disabled:cursor-not-allowed
```

### Animações
- Smooth transitions em todas as interações
- Ícone de loading com spin infinito
- Efeito hover no botão com seta animada

## 🔐 Segurança

- ✅ Validação robusta de entrada
- ✅ Proteção CSRF (Next.js automático)
- ✅ Sanitização de dados
- ✅ HTTPS recomendado em produção
- ✅ Rate limiting recomendado para produção

## 📊 Sidebar de Credibilidade

O componente inclui uma coluna lateral "sticky" com:

### Por que falar conosco?
- ⚡ Resposta em até 4 horas úteis
- 🔍 Análise inicial gratuita da sua arquitetura
- 🔐 Garantia de NDA (Acordo de Confidencialidade)

### Nossa Especialidade
- DevOps
- SRE
- Arquitetura Cloud
- FinOps
- CI/CD

## 🧪 Testando Localmente

```bash
# Instalar dependências (se não fez ainda)
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Abrir no navegador
# http://localhost:3000
```

## 📱 Responsividade

```css
/* Breakpoints usados */
sm: 640px  - Tablets pequenos
lg: 1024px - Desktops

/* Layout */
- Mobile: Coluna única, sidebar abaixo do formulário
- Desktop: Formulário (col-2) + Sidebar (col-1)
```

## 🔌 Customizações Comuns

### Alterar Cores Principais

```tsx
// Em ContactForm.tsx, substituir:
from-cyan-400 to-purple-500

// Por suas cores (ex: azul e laranja)
from-blue-400 to-orange-500
```

### Adicionar mais Opções de Gargalo

```tsx
const bottleneckOptions = [
  { value: 'minha-opcao', label: 'Meu Gargalo' },
  // ... mais opções
];
```

### Alterar Mensagem de Sucesso

```tsx
// No response da API (route.ts)
message: 'Sua mensagem customizada aqui!'
```

## 🚨 Tratamento de Erros

O componente trata:
- ✅ Campos vazios
- ✅ Email inválido
- ✅ Mensagem muito curta
- ✅ Erros de conexão
- ✅ Erros do servidor (5xx)
- ✅ Timeouts de requisição

## 📈 Próximos Passos para Produção

1. **Adicionar integração com banco de dados**
   ```typescript
   // Use Prisma, MongoDB, PostgreSQL, etc.
   await db.contact.create({ data: body })
   ```

2. **Enviar emails**
   ```typescript
   // Use SendGrid, Resend, Mailgun, etc.
   await sendEmail({ to: body.email, ... })
   ```

3. **Integrar com CRM**
   ```typescript
   // Use Salesforce, HubSpot, Pipedrive, etc.
   await crm.addLead({ email: body.email, ... })
   ```

4. **Adicionar rate limiting**
   ```typescript
   // Use Upstash, ou middleware customizado
   if (rateLimitExceeded) return 429
   ```

5. **Adicionar CAPTCHA**
   ```tsx
   // Use reCAPTCHA v3
   <ReCAPTCHA onChange={setToken} />
   ```

6. **Analytics**
   ```typescript
   // Rastrear conversões
   analytics.track('contact_form_submitted', { bottleneck })
   ```

## 🎓 Stack Utilizado

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Hooks nativo
- **HTTP Client**: Fetch API nativo

## 📄 Licença & Suporte

Este componente foi criado especificamente para sua consultoria DevOps, SRE e Cloud Architecture.

---

**Pronto para usar!** 🚀 Personalize as cores, textos e integrações conforme necessário.
