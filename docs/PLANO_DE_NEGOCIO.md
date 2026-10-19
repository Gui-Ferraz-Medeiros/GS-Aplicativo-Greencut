# Plano de Negócio — Motiva Greencut

## Proposta para discussão com a Motiva

O Greencut é uma proposta de apoio à priorização de roçada por trecho, conectando leitura de vegetação, triagem do gestor e registro de execução em campo. A oportunidade não é “automatizar a decisão de segurança”, mas melhorar a qualidade e a rastreabilidade da informação usada no planejamento da conservação.

O app entregue é um protótipo: os sensores, limites, mapa e tarefas usam dados simulados. Não há integração IoT, API, autenticação corporativa nem persistência. Qualquer piloto comercial requer validação técnica, operacional, de segurança e de compras pela Motiva.

## Contexto empresarial verificado

O release de resultados 2T26 da Motiva informa OPEX caixa/Receita Líquida Ajustada LTM de 34,1%, uma redução de 3,7 pontos percentuais contra 2T25. A companhia atribui ganhos de eficiência, entre outros fatores, à otimização de portfólio e a iniciativas de inovação e transformação tecnológica. O release informa também CAPEX consolidado de R$ 1,831 bilhão no trimestre e cita investimentos rodoviários em RioSP, Pantanal, ViaSul e Paraná. Esse CAPEX é consolidado e não representa orçamento de conservação ou verba disponível para o Greencut.

Na comparação de tráfego, o release reporta alta de 3,8% para rodovias e 2,3% excluindo o efeito do free flow da RMSP; parte das variações consolidadas decorre de novos ativos. Esses dados mostram escala e contexto de eficiência, mas não provam demanda, economia ou orçamento para esta solução.

A ANTT mantém extensão, trecho e documentos por contrato de concessão. Portanto, o piloto deve ser dimensionado para uma concessão escolhida pela Motiva, e não por uma estimativa genérica do portfólio total. O limite de altura usado no protótipo é parâmetro demonstrativo; deve ser validado por contrato, trecho e procedimento operacional, sem alegar que 30 cm seja regra legal universal.

## Problema e proposta de valor

O processo a validar é a identificação de trechos que precisam de vistoria ou intervenção, a programação de equipes e a comprovação do serviço. O Greencut pretende consolidar essa fila com localização, prioridade, histórico e alturas antes/depois. O benefício esperado é reduzir incerteza operacional e dar visibilidade do alerta até a execução; nenhuma economia foi medida ainda.

O produto deve complementar os sistemas de manutenção e segurança da Motiva. O gestor mantém a decisão final, e inspeções de campo continuam disponíveis para conferir medições, tratar falsos alertas e atender situações críticas.

## Público-alvo e envolvidos

- **Comprador e patrocinador:** diretoria/gerência de conservação ou operações de uma concessão da Motiva, com aprovação de tecnologia, segurança, suprimentos e finanças.
- **Gestor de conservação:** define critérios de prioridade, valida alertas e acompanha custos e backlog.
- **Supervisor operacional:** transforma prioridades aprovadas em ordens de serviço e coordena prestadores.
- **Operador de campo:** executa a atividade e registra observações e evidência antes/depois.
- **Áreas técnicas:** IoT/telecom, dados, cibersegurança, jurídico/LGPD e engenharia de rodovias.

## Piloto recomendado

Propor primeiro uma fase de descoberta e, após aprovação, um piloto de 6 a 12 meses em um trecho de uma concessão. A duração deve cobrir sazonalidade suficiente para comparar períodos de crescimento da vegetação. Um cenário de dimensionamento para discussão é 100 km e 50 pontos de medição; esses números são apenas uma hipótese de engenharia, não densidade recomendada nem escopo aprovado. A Motiva deve selecionar trecho, densidade, frequência e tecnologia depois de inspeção, avaliação de cobertura e análise de segurança.

O desenho deve incluir trechos monitorados e de comparação, com critérios definidos antes de iniciar: qualidade da medição versus vistoria manual, disponibilidade, falsos positivos/negativos, tempo de triagem e despacho, custo por km, impacto na programação e aderência ao processo existente. O limiar de sucesso precisa ser acordado com a área patrocinadora antes de coletar dados.

## Modelo de negócio

Recomendação inicial: **implantação e integração cobradas uma vez + serviço gerenciado recorrente**, precificado por concessão/trecho e volume de pontos monitorados. Isso alinha receita à cobertura e separa equipamento, operação e evolução de software.

- **Implantação:** levantamento, projeto de rádio/energia, instalação, calibração, integração e treinamento, cobrados por ordem de serviço após cotação.
- **Recorrência:** painel, processamento, suporte, monitoramento, manutenção e reposição conforme SLA e matriz de responsabilidades.
- **Equipamentos:** comparar compra pela Motiva, locação e serviço gerenciado; não fixar o modelo antes de cotar ciclo de vida, vandalismo, bateria e logística.
- **Expansões:** integração com gestão de manutenção/ordens de serviço, relatórios e níveis de suporte definidos em contrato.

A contratação comercial deve depender de piloto com aceite e critérios de interrupção claros. Não recomendar exclusividade nem promessa de economia garantida antes de medir uma linha de base.

## Estrutura de custos e modelo financeiro

Não há cotação pública verificável para sensor, instalação, telecom, manutenção em faixa de domínio ou mão de obra da Motiva. Por isso, as faixas fixas de preço anteriormente apresentadas foram retiradas: seriam falsa precisão em uma apresentação corporativa. A estimativa deve ser fechada por cotação com fornecedores e dados de uma concessão escolhida.

### Dimensionamento de referência

Para comparar propostas, use o cenário ilustrativo de 100 km, 50 pontos e 6–12 meses. Se cada ponto enviar uma mensagem a cada 15 minutos, o volume teórico é `50 × 4 × 24 × 30 = 144.000 mensagens/mês`, antes de retransmissões, downlinks e regras de processamento. Esse é um cálculo de carga, não um compromisso de frequência nem custo. A AWS informa cobrança separada por conectividade, mensagens, operações de registro/sombra e regras; a tarifa depende de região, tamanho e uso. O preço deve sair do AWS Pricing Calculator para a região efetivamente contratada e ser comparado com provedores alternativos.

### CAPEX de implantação

`CAPEX = pontos × (custo cotado do nó + instalação + proteção + comissionamento) + gateways + projeto de rádio/energia + integração + treinamento`

Solicitar no mínimo três cotações comparáveis, com garantia, vida útil, reposição, calibração, instalação segura e custo de ciclo de vida. Separar sensores e gateways do software para permitir comparar compra, locação e serviço gerenciado.

### OPEX mensal

`OPEX = conectividade + nuvem por uso + suporte/SLA + manutenção e calibração + reposição provisionada + deslocamentos + operação de dados`

Para deslocamentos, usar o preço municipal do diesel publicado pela ANP na semana de análise e a média real da frota da concessão. `custo de combustível = km rodados × consumo médio da frota (L/km) × preço ANP (R$/L)`. Somar custo-hora carregado da equipe e custo/km do veículo informados pela Motiva. A ANP publica resultados por abrangência geográfica e período, permitindo atualizar o parâmetro em vez de usar um preço nacional defasado.

### Receita, preço e ponto de equilíbrio

`receita recorrente = km monitorados × preço contratado por km/mês + serviços opcionais`

`preço mínimo = OPEX atribuível + amortização do CAPEX + impostos + margem e contingência acordadas`

O preço por km é uma hipótese comercial a testar contra cobrança por ponto ou por concessão. Não incluir preço nominal antes de obter BOM, cotações de conectividade e taxas internas de operação; construir cenário baixo/base/alto variando densidade, frequência, reposição e SLA.

## Viabilidade e retorno para a Motiva

Criar uma linha de base por trecho com frequência de inspeção, roçada programada e reativa, quilômetros de deslocamento, horas de equipe, consumo, custo de prestador, registros e ocorrências. Comparar período pré/pós e trechos de controle equivalentes, ajustando sazonalidade e alterações de tráfego/operação.

`custo evitável de deslocamento = viagens efetivamente evitadas × (km por viagem × consumo da frota × preço ANP + horas de equipe × custo-hora carregado + custo variável do veículo)`

`benefício líquido = custos evitáveis comprovados + produtividade comprovada - OPEX incremental - CAPEX amortizado`

`ROI do piloto = benefício líquido acumulado / investimento total do piloto`

Não contar alerta como economia: a intervenção só entra no benefício se a Motiva validar que foi evitada, consolidada ou melhor programada e não transferiu risco/custo para outro trecho. Não atribuir redução de acidentes ou conformidade regulatória sem desenho de avaliação aprovado.

## Indicadores e critérios de aceite

- erro da medição do dispositivo frente à vistoria manual, por tipo de vegetação e condição;
- disponibilidade e completude dos dados por ponto, incluindo período sem cobertura;
- falsos positivos/negativos e proporção de alertas confirmados por gestor;
- tempo entre coleta, triagem, despacho e conclusão;
- viagens, horas e intervenções reativas comparadas com controle;
- custo total por km e por intervenção, incluindo sensor, comunicação e manutenção;
- adesão dos operadores e completude dos registros de execução.

Definir metas numéricas com a Motiva antes do piloto, após baseline e validação do sensor. Os números do protótipo não são metas de performance.

## Diferenciais, riscos e salvaguardas

O diferencial potencial é fechar o ciclo entre leitura, triagem e relato de campo, com histórico que pode apoiar programação e auditoria. A vantagem frente ao processo atual precisa ser comprovada pela concessão, comparando interoperabilidade, custo total e qualidade do dado com as ferramentas existentes.

| Risco | Mitigação para avaliação com a Motiva |
|---|---|
| Sensor não mede a vegetação de forma consistente | Teste de bancada e campo contra método manual definido pela engenharia; documentação de erro e intervalo de calibração |
| Cobertura, energia, clima, poeira ou vandalismo inviabilizam o ponto | Survey e protótipo de instalação em poucos pontos antes de escalar; desenho de proteção e manutenção |
| Ruído de alertas desvia equipe ou causa falsa confiança | Human-in-the-loop, confirmação do gestor e fallback para inspeção convencional |
| Integração duplicada com o sistema atual | Mapear APIs, dono do processo e arquitetura de referência antes de contratar; exportação controlada como MVP |
| Instalação expõe equipe a risco em faixa rodoviária | Autorizações, análise preliminar de risco, plano de sinalização e janela operacional aprovados pela concessionária |
| Dados de localização/operador e cibersegurança | Minimização, controle por função, retenção definida, trilha de auditoria e avaliação de segurança/LGPD antes do piloto |
| Economia não cobre custo de sensor e manutenção | Comparação por controle, custo total de propriedade e critérios de saída; não escalar sem benefício demonstrado |

## Decisão solicitada à Motiva

1. Indicar patrocinador de conservação/operações e concessão para descoberta.
2. Autorizar workshop técnico e acesso a baseline anonimizado de inspeções, deslocamentos e serviços.
3. Definir donos de segurança, telecom, dados e integração.
4. Após desenho e cotações, decidir se há caso para piloto controlado de 6–12 meses.

## Fontes e método

- Motiva, [Press Release de Resultados 2T26](https://api.mziq.com/mzfilemanager/v2/d/8516d569-e11b-4864-a777-68eca8245423/b69d1ac9-863e-e4a2-6a8b-52fe88ac54a9?origin=2): indicadores financeiros e operacionais citados acima. Valores são do consolidado e não representam orçamento do Greencut.
- Motiva, [Central de Resultados](https://ri.motiva.com.br/resultados/central-de-resultados/): publicações periódicas para atualização de baseline.
- ANTT, [Lista de concessões rodoviárias](https://www.gov.br/antt/pt-br/assuntos/rodovias/concessionarias/lista-de-concessoes): consulta por contrato, responsável, extensão e documentação; usar o ativo selecionado pela Motiva.
- ANP, [Levantamento semanal de preços de combustíveis](https://www.gov.br/anp/pt-br/assuntos/precos-e-defesa-da-concorrencia/precos/levantamento-de-precos-de-combustiveis-ultimas-semanas-pesquisadas): preços por município/região; selecionar a semana e município correspondentes a cada cálculo.
- AWS, [AWS IoT Core Pricing](https://aws.amazon.com/iot-core/pricing/) e [AWS Pricing Calculator](https://calculator.aws/): cobrança por componentes e estimativa configurável; não usar preços de outra região como tarifa Brasil.

Consulta das fontes: 19/10/2026. O press release 2T26 foi extraído localmente porque o navegador não conseguiu indexar o PDF. Nenhuma cotação de hardware, preço da Motiva ou ROI foi presumido como dado público.
