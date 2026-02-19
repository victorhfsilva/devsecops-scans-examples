# DevSecOps Security Scans Examples

Este repositório contém exemplos completos de configurações de segurança para pipelines DevSecOps, demonstrando as melhores práticas de segurança em todas as fases do ciclo de desenvolvimento.

## Objetivo

Demonstrar a implementação de verificações de segurança automatizadas em um pipeline CI/CD completo, incluindo:

- **SCA (Software Composition Analysis)**: Análise de vulnerabilidades em dependências com OWASP Dependency-Check
- **SAST (Static Application Security Testing)**: Análise estática de código com Semgrep, SonarQube ou CodeQL
- **DAST (Dynamic Application Security Testing)**: Testes dinâmicos com OWASP ZAP
- **Secret Scanning**: Detecção de credenciais expostas com GitLeaks ou TruffleHog

## Estrutura do Projeto

```
.
├── .github/
│   └── workflows/
│       ├── sast.yaml            # Análise estática de código
│       ├── dast.yaml            # Testes dinâmicos
│       ├── sca.yaml             # Análise de dependências
│       └── secrets.yaml         # Detecção de secrets
├── src/                         # Código fonte da aplicação
├── package.json                 # Dependências do projeto (Node.js)
├── index.js                     # Aplicação exemplo
└── README.md                    # Este arquivo
```

## Como Funciona

Os workflows de segurança são executados automaticamente quando:
- Código é enviado para as branches `main`
- Um Pull Request é criado
- Semanalmente aos domingos (scans agendados)

## Ferramentas de Segurança Implementadas

### 1. SCA - Software Composition Analysis
**Ferramenta**: OWASP Dependency-Check
- Analisa dependências em busca de CVEs conhecidos
- Gera relatórios em HTML, JSON e SARIF
- Integração com GitHub Security

### 2. SAST - Static Application Security Testing
**Ferramenta**: Semgrep
- Detecta vulnerabilidades no código-fonte
- Identifica código inseguro, SQL Injection, XSS, etc.
- Análise de qualidade de código

### 3. DAST - Dynamic Application Security Testing
**Ferramenta**: OWASP ZAP
- Testa a aplicação em execução
- Identifica vulnerabilidades em tempo de execução
- Simula ataques reais

### 4. Secret Scanning
**Ferramentas**: GitLeaks
- Detecta credenciais hardcoded
- Identifica tokens, API keys, senhas
- Previne vazamento de secrets

## Vulnerabilidades Intencionais

Este projeto contém vulnerabilidades propositais para demonstrar as ferramentas:

### Dependências Vulneráveis (SCA)
- `express 4.17.1` - CVEs conhecidos
- `lodash 4.17.19` - Prototype pollution
- `axios 0.21.1` - SSRF vulnerabilities
- `minimist 1.2.5` - Prototype pollution
- `jquery 3.4.1` - XSS vulnerabilities

### Código Vulnerável (SAST)
- SQL Injection
- XSS (Cross-Site Scripting)
- Path Traversal
- Insecure Deserialization

### Secrets Expostos
- API keys hardcoded
- Senhas em texto claro
- Tokens de acesso

**ATENÇÃO**: Este é um projeto de exemplo para fins educacionais. Nunca use estas configurações em produção!

## Executando o Projeto

```bash
# Instalar dependências
npm install

# Executar aplicação
npm start
```

## Verificando Resultados

### GitHub Actions
1. Acesse a aba **Actions** no GitHub
2. Selecione o workflow desejado (Security Scans, SAST, DAST, etc.)
3. Baixe os artifacts gerados
4. Revise os logs de execução

### GitHub Security
1. Acesse **Security** > **Code scanning alerts**
2. Revise as vulnerabilidades encontradas por SAST e SCA
3. Acesse **Secret scanning alerts** para secrets detectados
4. Veja **Dependabot alerts** para dependências

