# 🌿 Motiva Greencut — Entrega Final (Sprint 4)

> App Android de avaliação gerado e instalado em emulador. Os dados ainda são mockados: não há autenticação de produção, backend, persistência nem integração real com sensores.

---

## 👥 Integrantes do Grupo (Grupo 24)
- Guilherme Ferraz — RM564743
- Roberto Marques Moreira — RM564935
- Anny Elly — RM565055
- Laís Salomão — RM565262

---

## 🎯 Solução
O Motiva Greencut organiza a priorização de roçada por rodovia e trecho. O gestor acompanha os status dos sensores, recomendações, alertas e relatórios; o operador consulta tarefas e registra as alturas antes e depois do serviço. A visão de produto prevê sensores IoT e conectividade LoRa, mas o protótipo apresentado usa dados simulados e não deve ser interpretado como telemetria real.

## 🧭 Entregas por Sprint

| Sprint | Entrega |
|---|---|
| Sprint 1 | Definição do problema de conservação rodoviária, proposta Greencut, personas de gestão/campo, requisitos funcionais e protótipo navegável no Figma. |
| Sprint 2 | Implementação do protótipo web/mobile com React, fluxo de gestão e operação, priorização de trechos e dados simulados; commits `a842b9a` e `467d7e5` registram essa evolução. |
| Sprint 3 | Protótipo web com perfis gestor/operador, seleção de rodovia, sensores e status, detalhe e alertas, relatório, tarefas e dados mockados. Estados vazios/erro e rotas foram concluídos na revisão pós-feedback. |
| Sprint 4 | Empacotamento Android via Capacitor, APK debug instalado e aberto no AVD, plano de negócio preliminar, roteiro de pitch e arquivo `.txt` de submissão criado. |

---

## ✅ Status da funcionalidade por módulo

| Funcionalidade | Status | Observação |
|---|---|---|
| Login com perfil Gestor/Operador | Concluído | Autenticação simulada, sem backend real |
| Tela de abertura / welcome screen | Concluído | Animação premium de boas-vindas antes do login |
| Navegação por rotas | Concluído | React Router com URLs e histórico do browser |
| Seleção de rodovia | Concluído | Mapa visual + lista de rodovias |
| Dashboard do gestor | Concluído | Cards e mapa de sensores |
| Detalhes do sensor | Concluído | Altura, histórico, estimativa e ações |
| Notificações de alerta | Concluído | Toasts e painel de notificações |
| Dashboard do operador | Concluído | Tarefas designadas ao operador |
| Execução de roçada/relato de campo | Concluído | Altura antes/depois e levantamento de campo |
| Relatório de priorização | Concluído | Resumo, ocorrências e intervenções |
| Dados mockados | Concluído | Cobertura realista para protótipo |
| APK Android | Gerado e testado no emulador | Build debug assinada com chave de desenvolvimento; não é release de loja |
| Plano de negócio | Elaborado | Premissas de piloto e faixas de custo precisam ser validadas com a Motiva e fornecedores |
| Vídeo de pitch | Pendente | Gravação real pelos integrantes, com app instalado e demonstração no dispositivo; sem narração automatizada |
| Estados de erro e vazio | Implementado | Listas vazias têm mensagens próprias; erros de renderização permitem recarregar a aplicação |
| Refinamento de UX visual | Concluído | Personalização da identidade visual, microinterações e melhor onboarding |
| Integração com APIs reais | Ausente | Ainda não existe backend ou integração externa |
| Autenticação real | Ausente | Necessária para Sprint 4 |
| Persistência real | Ausente | Estado local apenas |

---

## 🧱 Arquitetura da aplicação

### Stack principal
- React + TypeScript
- Vite
- Tailwind CSS
- React Router
- Capacitor 7 / Android Gradle
- Lucide React
- motion
- Sonner

### Estrutura do projeto
- src/main.tsx — entrada, roteador do browser e boundary global de erro
- src/app/App.tsx — estado compartilhado e definição das rotas
- src/app/components — telas e componentes próprios do produto
- src/app/components/AppErrorBoundary.tsx — recuperação de falhas de renderização
- src/mocks/mockData.ts — dados simulados
- capacitor.config.json e android/ — ponte Capacitor e projeto nativo
- docs/PLANO_DE_NEGOCIO.md — plano, personas, custos, riscos e indicadores
- ENTREGA_FINAL.txt — nomes/RMs e campos dos três links exigidos

O protótipo é front-end e mantém os dados em memória usando mocks. As telas principais usam rotas de browser: `/highways`, `/highways/:highwayId`, `/highways/:highwayId/report`, `/sensors/:sensorId`, `/operator/tasks` e `/operator/tasks/:sensorId`. Ainda não há backend, persistência ou conexão real com sensores IoT.

### Atualizações recentes implementadas
- Inclusão de animação de abertura com visual premium e transição suave para a tela de login
- Ajuste de onboarding para tornar a experiência inicial mais profissional e envolvente
- Refinamento visual de identidade da marca GreenCut e dos elementos de destaque
- Melhor organização da lógica de prioridade para alertas críticos e atenção
- Rotas de browser para os fluxos do gestor e do operador
- Estados vazios no dashboard e no relatório, além de boundary para erros de renderização
- Remoção dos componentes UI exportados pelo template que não eram utilizados
- Empacotamento Android com Capacitor e teste de instalação/abertura em emulador

## 📦 APK e publicação

- **APK de avaliação local:** [app-debug.apk](android/app/build/outputs/apk/debug/app-debug.apk)
- **Download público:** [APK v1.0.0](https://github.com/Gui-Ferraz-Medeiros/GS-Aplicativo-Greencut-BETA-/releases/download/v1.0.0/Motiva-Greencut-1.0.0.apk) · [página da Release](https://github.com/Gui-Ferraz-Medeiros/GS-Aplicativo-Greencut-BETA-/releases/tag/v1.0.0)
- **Tipo:** APK debug, assinado pela chave de desenvolvimento do Android. Instalável para avaliação, mas não assinado para distribuição na Play Store.
- **Vídeo no YouTube (não listado):** pendente de gravação real pelo grupo. Usar o roteiro em `docs/ROTEIRO_PITCH.md` e incluir o link depois da publicação.
- **Arquivo de submissão:** `ENTREGA_FINAL.txt`; substituir os três campos `PREENCHER` antes do envio.

## 💼 Plano de negócio — resumo

**Proposta de valor:** priorizar a roçada por trecho a partir de medições de vegetação, registrar execução e facilitar o acompanhamento operacional. O app atual é um protótipo com mocks; a medição IoT e a economia projetada ainda precisam ser validadas.

**Clientes e usuários:** concessionária/área de conservação como compradora; gestores rodoviários, supervisores de operação e operadores de campo como usuários. Tecnologia, segurança, suprimentos e prestadores de serviço participam da implantação.

**Receita proposta:** implantação e treinamento pagos, seguidos de serviço gerenciado anual cobrado por quilômetro monitorado e densidade de sensores, com integrações e SLA opcionais.

**Base factual e custos:** o release 2T26 da Motiva reporta OPEX caixa/receita líquida ajustada LTM de 34,1% (-3,7 p.p. contra 2T25), CAPEX consolidado de R$ 1,831 bi no trimestre e crescimento comparável de tráfego rodoviário de 3,8% (2,3% sem o efeito do free flow da RMSP). Esses indicadores contextualizam a busca por eficiência, mas não representam verba do Greencut. O piloto deve usar cotações de hardware e custos reais da concessão; o plano define fórmulas auditáveis para CAPEX, OPEX, preço e ROI, sem estimativas sem fonte.

**Diferenciais e impacto a medir:** priorização por severidade, fluxo do alerta à tarefa e registro de alturas antes/depois. Medir custo por km, proporção de roçadas reativas, tempo de atendimento, disponibilidade e falsos alertas. Não há redução de custo ou impacto de segurança já comprovados.

Plano completo: [docs/PLANO_DE_NEGOCIO.md](docs/PLANO_DE_NEGOCIO.md).

---

## 🧪 Testes manuais principais

Os seis fluxos principais abaixo foram validados manualmente no ambiente local com Vite.

### 1) Login como gestor
- Cenário: preencher usuário e senha e entrar como gestor
- Resultado esperado: exibir dashboard e permitir navegação de rodovias
- Resultado obtido: login realizado com sucesso e toast de confirmação exibido
- Status: passou

### 2) Seleção de rodovia e carregamento do dashboard
- Cenário: selecionar uma rodovia da lista
- Resultado esperado: dashboard com sensores do trecho e contadores por status
- Resultado obtido: dashboard carregou corretamente
- Status: passou

### 3) Visualização de sensor crítico
- Cenário: abrir detalhes de um sensor em estado crítico
- Resultado esperado: exibir altura, histórico, recomendação e ação imediata
- Resultado obtido: tela de detalhes carregou com informações e alertas
- Status: passou

### 4) Fluxo do operador para concluir roçada
- Cenário: entrar como operador, abrir tarefa designada e registrar altura antes/depois
- Resultado esperado: concluir operação e retornar ao dashboard
- Resultado obtido: trabalho foi concluído com sucesso no fluxo simulado
- Status: passou

### 5) Relatório de priorização
- Cenário: abrir tela de relatórios após ação do gestor
- Resultado esperado: exibir sensores críticos, alertas e recomendações
- Resultado obtido: relatório foi exibido com dados mockados, ocorrências e intervenções
- Status: passou

### 6) Notificações do sistema
- Cenário: disparar notificação de alerta de sensoriamento crítico
- Resultado esperado: painel de notificações e toast visíveis
- Resultado obtido: notificação apareceu corretamente
- Status: passou

### Verificações adicionais dos estados de erro e vazio

### Estado vazio de sensores
- Cenário: abrir uma rodovia sem sensores disponíveis
- Resultado esperado: dashboard informa a ausência de sensores e não apresenta a rodovia como normal
- Status: implementação concluída; validar manualmente com uma lista vazia

### 8) Recuperação de erro de renderização
- Cenário: ocorrer uma falha durante a renderização de uma tela
- Resultado esperado: exibir mensagem de erro e permitir recarregar a aplicação
- Status: implementação concluída; validar manualmente

### Navegação por rotas
- Cenário: autenticar, selecionar rodovia, abrir sensor e relatório e usar voltar do navegador
- Resultado esperado: URL acompanha cada tela e o histórico retorna à tela anterior
- Resultado obtido: fluxo do gestor validado em `/highways`, `/highways/riosp`, `/sensors/s7` e `/highways/riosp/report`
- Status: passou

---

## ⚠️ Pendências para publicação

- APK v1.0.0 já está publicado na Release; é debug e usa assinatura de desenvolvimento, não uma build para Play Store.
- Vídeo de até 5 minutos precisa ser gravado pelos integrantes e publicado como não listado no YouTube.
- O link do repositório e o link público do APK já estão em `ENTREGA_FINAL.txt`; falta preencher o link do vídeo não listado.
- Após a reescrita do histórico, integrantes com clones antigos devem clonar novamente `main` antes de contribuir.
- Backend, autenticação real, persistência e ESP32/LoRa continuam fora do protótipo.
- Validar com a equipe os estados vazios/erro em cenários controlados e criar testes automatizados.

## ✅ Fechamento da Sprint 4

1. APK Android gerado com Capacitor e validado por instalação e abertura em AVD Android 36.1.
2. Plano de negócio contextualizado à operação rodoviária, com premissas identificadas como estimativas.
3. Roteiro de pitch com participação dos quatro integrantes; vídeo real permanece a cargo do grupo.
4. README consolidado e `.txt` de submissão preparado; falta publicar e inserir o link do vídeo.

---

## 🚀 Como rodar o projeto

### Requisitos
- Node.js 20 ou superior
- pnpm
- JDK 21
- Android SDK com Android 35 e Build Tools 34 ou superior

### Comandos
```bash
pnpm install
pnpm web
```

### Gerar APK de avaliação

No Windows PowerShell, configure `JAVA_HOME` para o JDK 21 e `ANDROID_HOME` para a pasta do Android SDK. Exemplo:

```powershell
$env:JAVA_HOME = "C:\caminho\para\jdk-21"
$env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"
$env:ANDROID_SDK_ROOT = $env:ANDROID_HOME
$env:Path = "$env:JAVA_HOME\bin;$env:Path"
pnpm install
pnpm android:apk
```

O script executa o build web, sincroniza os assets do Capacitor e chama o Gradle. O arquivo resultante fica em `android/app/build/outputs/apk/debug/app-debug.apk`. Não commitar o APK nem chaves de assinatura.

### Instalar em dispositivo Android

Transfira o APK para o aparelho, permita temporariamente a instalação de aplicativos da origem usada para abrir o arquivo e toque em `app-debug.apk`. O Android pode exibir um aviso por ser um APK de depuração. Para distribuição pública/loja, gerar uma variante release com certificado de assinatura protegido e fazer os testes de release necessários; a chave debug deste projeto não serve para publicação.

### Executar versão web

```bash
pnpm web
```

O Vite informa a URL e a porta disponíveis ao iniciar.

---

## 📌 Conclusão
O Greencut possui um protótipo navegável e um APK de avaliação instalado e aberto em emulador. A proposta de negócio e o vídeo ainda precisam de validação/publicação externa; integração IoT, serviços reais, segurança de produção e ROI exigem piloto com a Motiva. O `.txt` é o único arquivo a enviar como entregável final, depois de preencher os links públicos.
