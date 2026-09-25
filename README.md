# Synapse UI

**Memória de projeto e workflows de frontend para Next.js, React e TypeScript.**

Synapse UI transforma convenções que normalmente se perdem em conversas — por exemplo, como um campo deve validar, quando usar Server Components ou como revisar um payload — em registros Markdown locais e reutilizáveis. Ele também adiciona skills focadas para criar, revisar, proteger, testar e otimizar frontend.

- Local-first: memórias vivem no próprio projeto, em `.synapse-ui/memories/`.
- Compatível com Codex e Claude Code usando o mesmo diretório `skills/`.
- Sem dependências de runtime, telemetria ou sincronização remota.
- Feito para decisões deliberadas: uma memória é consultada e aplicada, nunca injeta alterações silenciosamente.

## Comece em minutos

### Codex

Instale a entrada `synapse-ui` do seu marketplace pessoal do Codex e inicie uma nova conversa. Depois, descreva a intenção naturalmente:

```text
Synapse, salve nossa convenção de campos de formulário.
Synapse, aplique input-contract ao CheckoutForm.
Synapse, revise este payload antes de eu criar a Server Action.
```

### Claude Code

Para carregar o plugin durante uma sessão de desenvolvimento:

```bash
claude --plugin-dir C:\path\to\synapse-ui
```

Use as skills com namespace:

```text
/synapse-ui:synapse-save
/synapse-ui:synapse-component
/synapse-ui:synapse-security
```

### CLI via npm

Após a primeira publicação no npm, instale o pacote no projeto alvo:

```bash
npm install --save-dev @costadev/synapse-ui
npx --package @costadev/synapse-ui synapse-ui list
```

O comando `synapse-ui` usa o diretório atual como raiz do projeto. Para operar outro projeto sem trocar de pasta, defina `SYNAPSE_UI_ROOT` para o caminho dele.

## Salve convenções que realmente ajudam

Uma memória não é um bloco solto de prompt. Ela exige uma regra, escopo, situação de aplicação e tags; também pode guardar exceções, exemplo e evidência.

Execute a partir da raiz do projeto que receberá a convenção:

```bash
npx --package @costadev/synapse-ui synapse-ui save --name input-contract --title "Input contract" --scope "shared forms" --tags "forms,accessibility,typescript" --rule "Inputs use a visible label, controlled value, and onChange." --when "Building reusable form fields." --avoid "Do not apply to hidden machine-only fields." --example '<Field id="email" />' --evidence "User-confirmed project convention"
```

A memória criada fica em `.synapse-ui/memories/input-contract.md`. Como é Markdown comum, a equipe pode revisar e versionar as convenções junto do código.

### Consulte e mantenha memórias

```bash
synapse-ui list
synapse-ui find --query input
synapse-ui get --name input-contract
synapse-ui delete --name input-contract --confirm
```

Nomes aceitam apenas letras minúsculas, números e hífens. O comando não sobrescreve um registro sem `--replace`, e exclusão sempre exige `--confirm`.

## Workflows incluídos

| Skill | Para usar quando você precisa… |
| --- | --- |
| `synapse-save` / `synapse-use` | capturar, buscar, recuperar e aplicar convenções de projeto |
| `synapse-component` | definir APIs de componentes, estados, acessibilidade e responsividade |
| `synapse-form` | criar campos, validação, feedback de envio e UX de erro |
| `synapse-next` | trabalhar com App Router, limites de dados, metadata e estados de carregamento |
| `synapse-design-system` | estruturar tokens, primitivas, variantes e estados visuais |
| `synapse-review` | revisar uma mudança contra as convenções reais do projeto |
| `synapse-security` | proteger Server Actions, variáveis de ambiente, conteúdo renderizado e headers |
| `synapse-payload-review` | seguir um payload do browser até validação, autorização, persistência e DTO de resposta |
| `synapse-threat-model` | mapear fronteiras de confiança e controles defensivos de uma funcionalidade |
| `synapse-dependency-review` | avaliar risco de pacote, licença, supply chain, bundle e manutenção antes de adicioná-lo |
| `synapse-performance` | melhorar renderização, bundle, assets, scripts e Web Vitals no Next.js |
| `synapse-test` | planejar testes comportamentais, acessíveis, de segurança e E2E |
| `synapse-seo` | implementar metadata, previews sociais, sitemap, robots e indexabilidade |

## Privacidade e segurança

Synapse UI armazena arquivos somente no projeto alvo e não envia dados a um serviço. Nunca salve credenciais, tokens, chaves privadas, dados de clientes ou conteúdo sensível nas memórias.

As skills de segurança são defensivas. Para mutações, tratam Server Actions e Route Handlers como limites públicos: valide o dado no servidor, autorize a ação e devolva somente o DTO necessário. Elas não implementam autenticação nem fazem varreduras ou exploração de sistemas.

## Desenvolvimento

Requisitos: Node.js 20 ou superior.

```bash
npm test
npm pack --dry-run
claude plugin validate .
```

O teste usa o runner nativo do Node e cobre o ciclo de salvar, buscar, recuperar e excluir uma memória, além das proteções contra nomes inválidos, registros incompletos e exclusão sem confirmação.

## Publicação no npm

O pacote público é `@costadev/synapse-ui`; o nome sem escopo `synapse-ui` já está ocupado. Antes da primeira publicação, autentique-se na conta npm `costadev`:

```bash
npm whoami
npm publish
```

Para publicar a partir de uma GitHub Release, configure npm Trusted Publishing para o pacote `@costadev/synapse-ui` e o repositório `GabrielKqw/Synapse-UI`. O workflow usa credenciais OIDC de curta duração e não requer token npm no repositório.

## Licença

[MIT](LICENSE) © Gabriel Costa.
