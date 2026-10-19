# Plano de Negócio — Motiva Greencut

## Resumo executivo

O Motiva Greencut propõe apoiar concessionárias na priorização da roçada de vegetação ao longo das rodovias. O produto combina medições de altura da vegetação, localização por trecho, alertas e fluxo de trabalho entre gestão e equipes de campo. O protótipo atual demonstra essas telas com dados simulados; não há integração real com sensores, backend ou persistência. A oferta comercial depende de validar hardware, operação e retorno em um piloto controlado.

## Problema e proposta de valor

A gestão de vegetação em uma malha extensa exige inspeções e decisões recorrentes. Sem uma visão consolidada por trecho, uma equipe pode atuar tarde em áreas críticas ou realizar roçadas sem prioridade clara. A proposta é converter medições periódicas em uma fila operacional auditável: identificar trechos por severidade, direcionar tarefas, registrar as alturas antes/depois e acompanhar o histórico.

Valor a validar para a Motiva: melhor previsibilidade das equipes, evidência da execução por trecho, identificação antecipada de áreas que exigem ação e dados comparáveis para planejar contratos e custos de manutenção. O sistema é apoio à decisão, não substitui inspeção de segurança nem julgamento do responsável pela rodovia.

## Público-alvo e personas

- **Gestor de conservação rodoviária:** acompanha trechos, compara criticidade, define prioridade e precisa justificar a alocação das equipes.
- **Supervisor de operações:** distribui ordens de serviço, acompanha prazos e verifica se o resultado em campo foi registrado.
- **Operador de campo:** consulta tarefas designadas e registra altura antes/depois, observações e conclusão do serviço.
- **Áreas influenciadoras:** tecnologia/IoT, segurança viária, suprimentos, engenharia de manutenção, concessionárias e prestadores de roçada.

O comprador inicial seria a concessionária ou a área responsável pela conservação; os usuários cotidianos seriam gestores, supervisores e equipes contratadas.

## Modelo de receita

Modelo recomendado: implantação paga mais serviço gerenciado anual, cobrado por quilômetro monitorado e faixa de densidade de sensores.

- **Implantação:** levantamento do trecho, configuração, instalação, integração e treinamento; valor definido após vistoria e cotação dos componentes.
- **Serviço recorrente:** acesso ao painel, processamento dos dados, suporte, monitoramento de disponibilidade e manutenção programada.
- **Expansão opcional:** integrações com sistemas de ordens de serviço, relatórios específicos e níveis de suporte acordados.

A contratação deve começar como piloto de 6 a 12 meses, com critérios de aceite e saída definidos. Não se recomenda vender uma redução de custo garantida antes de medir a linha de base.

## Estimativa preliminar de custos

Estimativa de planejamento para um piloto hipotético de 100 km e aproximadamente 50 pontos de medição. Os valores são hipóteses em reais, não cotações nem preços aprovados pela Motiva. A arquitetura, a frequência de medição, a cobertura LoRa/celular, a energia e as exigências de instalação podem alterar bastante o total.

| Componente do piloto | Faixa preliminar |
|---|---:|
| 50 nós de medição, proteção e montagem (R$ 750–1.400 por ponto) | R$ 37.500–70.000 |
| Gateways, antenas, energia e backhaul | R$ 12.000–24.000 |
| Instalação, logística e comissionamento | R$ 25.000–45.000 |
| Engenharia, integração inicial e treinamento | R$ 20.000–35.000 |
| **Implantação estimada** | **R$ 94.500–174.000** |

| Operação mensal do piloto | Faixa preliminar |
|---|---:|
| Nuvem, armazenamento, observabilidade e conectividade | R$ 2.000–5.000 |
| Inspeção, calibração e manutenção de campo | R$ 4.000–8.000 |
| Suporte operacional e análise de dados | R$ 8.000–14.000 |
| **Custo operacional estimado** | **R$ 14.000–27.000/mês** |

Como hipótese comercial para discussão, um serviço gerenciado de 100 km poderia ser testado entre R$ 22.000 e R$ 36.000 por mês, além da implantação. A faixa precisa ser recalculada com custos reais, impostos, margem, SLA, quantidade de sensores e modelo de contratação. Não é uma proposta comercial formal.

## Viabilidade e cálculo de retorno

Antes do piloto, a Motiva deve fornecer custo atual por quilômetro, frequência de roçada, horas de equipe, deslocamentos, intervenções reativas e ocorrências relevantes. Comparar trechos monitorados e trechos de controle com sazonalidade semelhante.

Fórmula de avaliação mensal:

`benefício líquido = custo evitado de intervenções e deslocamentos + valor operacional mensurável - custo do serviço - custo de manutenção dos dispositivos`

`ROI = benefício líquido acumulado / investimento total do piloto`

O ponto de equilíbrio não pode ser afirmado sem os custos reais da operação. Como metas experimentais, a equipe pode testar disponibilidade de telemetria acima de 90%, redução de 15% em intervenções reativas e redução de 20% no tempo entre alerta validado e designação. São hipóteses de sucesso do piloto, não resultados já obtidos nem garantias.

## Diferenciais competitivos

- Visão por rodovia e trecho, com severidade legível para priorização.
- Continuidade entre alerta de sensor, designação e relato de campo com alturas antes/depois.
- Histórico que ajuda a revisar frequência e resultado das intervenções.
- Possibilidade de usar LoRa em trechos sem cobertura celular contínua, desde que o levantamento de rádio confirme viabilidade.
- Abordagem incremental: piloto mensurável antes de expandir a malha.

O diferencial só se confirma quando comparado com os processos e sistemas já usados pela concessionária. O protótipo ainda não mede vegetação nem integra LoRa: todos os dados exibidos são mocks.

## Impacto esperado e indicadores

Impactos esperados a medir: melhor distribuição de equipes, menos deslocamentos sem prioridade, maior rastreabilidade da execução e detecção mais rápida de trechos que exigem inspeção. O piloto deve acompanhar:

- custo de roçada por km e por intervenção;
- proporção de intervenções planejadas versus reativas;
- tempo do alerta validado até a designação e até a conclusão;
- disponibilidade e qualidade das medições, falsos alertas e chamados de manutenção;
- cumprimento dos registros de altura antes/depois;
- indicadores de segurança e ocorrências definidos pela Motiva, sem atribuir causalidade sem evidência.

## Riscos e mitigação

| Risco | Mitigação proposta |
|---|---|
| Medição imprecisa por clima, vegetação, vibração ou instalação | Calibrar contra medição manual, registrar confiança e manter inspeção humana |
| Cobertura LoRa/celular ou alimentação insuficiente | Fazer survey do trecho, testar gateways e dimensionar energia antes de instalar |
| Danos, vandalismo e custo de manutenção | Fixação adequada, inventário, reposição e manutenção preventiva no piloto |
| Alertas excessivos ou baixa confiança operacional | Ajustar limites por trecho, medir falsos positivos e permitir revisão pelo gestor |
| Integração com processos/sistemas existentes | Definir interfaces e responsáveis de TI antes do piloto; começar com exportação controlada |
| Segurança viária durante instalação e manutenção | Planejar acesso, sinalização, permissões e equipes habilitadas com a concessionária |
| Dados de localização e identificação de operadores | Minimizar dados pessoais, controlar acesso, definir retenção e avaliar LGPD |
| Retorno financeiro não comprovado | Baseline, grupo de comparação e critérios de aceite acordados previamente |
| Dependência de fornecedor | Documentar formatos, APIs, propriedade dos dados e plano de continuidade |

## Próximos passos para validar o negócio

1. Escolher um trecho piloto e um grupo de comparação com a área de conservação da Motiva.
2. Levantar baseline, requisitos de segurança, cobertura, energia e sistemas existentes.
3. Prototipar e testar o sensor em bancada e em campo contra medição manual.
4. Recalcular implantação, operação, preço e ROI com cotações e dados da concessionária.
5. Rodar o piloto por uma estação operacional representativa e revisar os KPIs antes de escalar.
