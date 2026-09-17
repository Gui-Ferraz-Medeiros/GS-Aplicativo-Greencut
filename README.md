# 🌿 Greencut — Sprint 3 (Protótipo Funcional Completo)

> Status atual: protótipo funcional de front-end com dados mockados, navegável e consistente visualmente. Ainda não há backend real, autenticação real nem integração com IoT/API externa.

---

## 👥 Integrantes do Grupo (Grupo 24)
- Guilherme Ferraz — RM564743
- Roberto Marques Moreira — RM564935
- Anny Elly — RM565055
- Laís Salomão — RM565262

---

## 🎯 Objetivo da Sprint 3
Entregar uma aplicação funcional com os fluxos principais e secundários navegáveis, mantendo a identidade visual GreenCut e usando mocks quando a integração real ainda não existe.

---

## ✅ Status da funcionalidade por módulo

| Funcionalidade | Status | Observação |
|---|---|---|
| Login com perfil Gestor/Operador | Concluído | Autenticação simulada, sem backend real |
| Tela de abertura / welcome screen | Concluído | Animação premium de boas-vindas antes do login |
| Seleção de rodovia | Concluído | Mapa visual + lista de rodovias |
| Dashboard do gestor | Concluído | Cards e mapa de sensores |
| Detalhes do sensor | Concluído | Altura, histórico, estimativa e ações |
| Notificações de alerta | Concluído | Toasts e painel de notificações |
| Dashboard do operador | Concluído | Tarefas designadas ao operador |
| Execução de roçada/relato de campo | Concluído | Altura antes/depois e levantamento de campo |
| Relatório de priorização | Concluído | Resumo, ocorrências e intervenções |
| Dados mockados | Concluído | Cobertura realista para protótipo |
| Estados de erro e vazio | Parcial | Há cenários de vazio, mas sem validação automatizada |
| Refinamento de UX visual | Concluído | Personalização da identidade visual, microinterações e melhor onboarding |
| Integração com APIs reais | Ausente | Ainda não existe backend ou integração externa |
| Autenticação real | Ausente | Necessária para Sprint 4 |
| Persistência real | Ausente | Estado local apenas |
| Vídeo de apresentação | Ausente | Requer gravação e publicação |
| Arquivo final .txt de entrega | Pendente | Requer dados finais e link do vídeo |

---

## 🧱 Arquitetura atual

### Stack principal
- React + TypeScript
- Vite
- Tailwind CSS
- Radix UI
- Lucide React
- motion
- Sonner

### Estrutura do projeto
- src/main.tsx — entrada da aplicação
- src/app/App.tsx — lógica global, navegação e estados
- src/app/components — telas do protótipo
- src/mocks/mockData.ts — dados simulados
- src/app/components/ui — biblioteca visual reutilizável

### Arquitetura observada
A aplicação é um protótipo front-end com estado local em memória. Não há backend, API real, banco de dados ou conexão com sensores IoT reais. A navegação é feita por mudança de estado e não por rotas de browser.

### Atualizações recentes implementadas
- Inclusão de animação de abertura com visual premium e transição suave para a tela de login
- Ajuste de onboarding para tornar a experiência inicial mais profissional e envolvente
- Refinamento visual de identidade da marca GreenCut e dos elementos de destaque
- Melhor organização da lógica de prioridade para alertas críticos e atenção
- Manutenção do fluxo principal do gestor e do operador em estado funcional e navegável

---

## 🧪 Testes manuais principais

Os testes abaixo foram validados manualmente no ambiente de execução local com Vite.

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

---

## ⚠️ Pendências identificadas
- Backend/API real ausente
- Integração com ESP32/LoRa não implementada
- Persistência de dados não existente
- Testes automatizados ainda não desenvolvidos
- README e documentação final precisam ser revisados para adequação à entrega oficial
- Vídeo de apresentação ainda pendente
- Arquivo .txt final ainda precisa ser gerado com dados definitivos

---

## � Plano de ajustes para a Sprint 4
1. Criar camada de serviços para dados e autenticação
2. Implementar persistência real e sincronização local
3. Estruturar rotas de navegação real com React Router
4. Adicionar testes automatizados de fluxo principal
5. Melhorar estados de erro, vazio e recuperação de falha
6. Preparar vídeo e versionar documentação final com entregáveis reais
7. Definir melhor arquitetura para futuras integrações com sensores e backend

---

## 🚀 Como rodar o projeto

### Requisitos
- Node.js
- pnpm

### Comandos
```bash
pnpm install
pnpm web
```

### URL local
```text
http://localhost:5174/
```

> Observação: a porta 5173 pode estar ocupada em certas máquinas; o projeto usa fallback para 5174 no ambiente local testado.

---

## 📌 Conclusão
O protótipo atual atende ao objetivo principal da Sprint 3 de demonstrar a solução GreenCut de forma funcional e visualmente consistente. O projeto está pronto como prova de conceito de front-end, mas ainda depende de evolução para backend, persistência e documentação de entrega final.
