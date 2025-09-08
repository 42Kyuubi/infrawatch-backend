
# infrawatch-backend

O **infrawatch-backend** é o núcleo do projeto **infrawatch**, um **SaaS multi-tenant de monitoramento corporativo**.
Ele é responsável por gerenciar a coleta de métricas (via **agents** e **polling**), processar os dados, armazená-los e disponibilizá-los para dashboards e sistemas de alerta em tempo real.

---

## 🎯 Objetivo do projeto

Entregar uma plataforma de monitoramento moderna e escalável que permita:

* Monitorar **servidores**, **equipamentos de rede** e **aplicações web**.
* Suporte a **duas modalidades de coleta**:

  * **Agents**: instalados nos alvos para métricas detalhadas (CPU, memória, disco, logs, etc.).
  * **Polling**: verificação remota sem instalação no alvo (ping, SNMP, HTTP).
* Gerar **alertas inteligentes** (e-mail, Slack, Telegram, etc.).
* Disponibilizar **dashboards em tempo real** com métricas de disponibilidade e desempenho.
* Ser **multi-tenant**, permitindo que diferentes empresas/organizações usem a mesma infraestrutura com segurança e isolamento.

---

## 🏗️ Arquitetura

O backend é construído para ser **modular e escalável**:

* **API REST** → fornece endpoints seguros para frontend, dashboards e integrações.
* **Engine de monitoramento** → executa verificações de agentes e polling.
* **Banco de dados** → armazena métricas, alertas, configurações e tenants.
* **Módulo de autenticação multi-tenant** → garante isolamento entre organizações.

---

## ⚙️ Funcionalidades principais

* ✅ Coleta de métricas por **agents** e **polling**.
* ✅ Registro centralizado de dados de monitoramento.
* ✅ Sistema de **alertas configuráveis**.
* ✅ Suporte a **múltiplos tenants** (empresas).
* ✅ API para integração com outros sistemas.
* 🚧 Dashboards em tempo real (em desenvolvimento).
* 🚧 Relatórios históricos e SLA (em desenvolvimento).


## 🛠️ Tecnologias utilizadas


* **Linguagem:** Node.js (TypeScript)
* **Banco de dados:** PostgreSQL
* **Autenticação:** JWT / OAuth2 multi-tenant
* **Monitoramento:** SNMP, ICMP (Ping), HTTP, agentes customizados


