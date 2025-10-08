# Projeto Integrador Interdiciplinar (PII) - Show do Milhão

Esse repositório tem como objetivo desenvolver um jogo interativo de perguntas e 
respostas inspirado no formato do "Show do Milhão" para o Colégio Poliedro.

## Integrantes
|Alunos                               | R.A          | Github              |Cargo                              |
|-------------------------------------|--------------|---------------------|-----------------------------------|
| Arthur Monteiro                     | 25.00687-5   | @Enzo-Pizzoni       | Dev. e Documentação               |
| Enzo Pizzoni de Sette               | 25.00467-2   | @Enzo-Pizzoni       | Dev. e Documentação               |
| Gabriel Medeiros Araujo             | 25.11742-5   | @IsabellaPassarelli | Prototipação e Documentação       |
| Luana Ferreira Silva                | 25.01656-9   | @luafxrreira        | Dev. Documentação                 |
| Thiago Santos Machado               | 25.01702-1   | @Thiago-stosm       | Dev. e Documentação               |

## Estrutura do projeto
```
📁 QUIZFORTUNA
|   ├── 📁 meuprojeto
|   |   │── 📁 src
|   |   |   ├── 📁 main
|   |   |   |   ├── App.java
|   |   |   |   ├── 📁 assets
│   |   |   |   ├── 📁 connectionFactory [Conexão com o DB]
│   │   |   |   |   └── connectionFactory.java
|   |   |   |   ├── 📁 dao [Arquivos de interação com o DB]
|   |   |   |   ├── 📁 model [Arquivos de gerenciamento dos dados]
|   |   |   |   ├── 📁 service [Operações entre a interface e o acesso a dados]
│   |   |   |   ├── 📁 ui [Arquivos de interface]
│   |
|   ├── 📁 sql
|   |   └──script
|
├── config.properties
└── README.md
```
## Funcionalidades
1. Interface e Jogabilidade:
    - Jogo baseado em interface gráfica simples.
    - Exibição clara das perguntas e opções de respostas.
    - Feedback imediato sobre acertos e erros
2. Banco de Perguntas e Sorteio Aleatório:
    - Base de dados com perguntas categorizadas por nível de dificuldade.
    - Sorteio aleatório das perguntas dentro de cada nível.
    - Garantia de que uma pergunta não seja repetida dentro da mesma partida.
3. Controle de Nível e Progressão:
    - O jogo começa com perguntas fáceis e aumenta gradativamente a dificuldade.
    - O jogador deve responder corretamente para avançar para perguntas mais difíceis.
    - Prêmios fictícios são atribuídos conforme o progresso.
4. Salvamente e Estatísticas:
    - Registro de pontuação e progresso de jogador em um banco de dados.
    - Histórico de perguntas respondidas corretamente e erradas.
5. Checkpoints e Sistema de Prêmios:
    - Implementação de checkpoint a cada 5 perguntas corretas.
    - Se o jogador errar, pode voltar ao último checkpoint ao invés de perder todo o progresso.
    - Definição de um prêmio máximo para quem responde todas as perguntas corretamente.

## Tecnologias Utilizadas
- Java
- MySQL
