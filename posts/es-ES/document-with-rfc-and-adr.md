---
title: 'Documenta tus decisiones técnicas utilizando RFC y ADR'
excerpt: 'Una introducción a la generación de documentos RFC (Request for Comments) y ADR (Architecture Decision Record) para el registro de decisiones técnicas.'
coverImage: '/assets/blog/document-with-rfc-and-adr/cover.png'
date: '2021-03-31T00:00:00Z'
tags: [documentation, software architecture, software design]
---

## TL;DR

- Usar RFCs para crear y refinar propuestas técnicas ayuda no solo a generar mejor documentación sino también a mejorar nuestro proceso de decisiones.
- Usar ADRs como registro, o historial, de decisiones ayuda también a mejorar el proceso de transmisión de conocimiento dentro del proyecto, por ejemplo en el onboarding de nuevos ingresos.
- Es recomendable utilizar un template para generar estos documentos de forma rápida: [Documented Software Decisions](https://github.com/emanuelcasco/document-software-decision-template).

## Introducción

Durante el ciclo de vida de un proyecto, **gran parte del tiempo del equipo es dedicado a la toma de decisiones**, estas pueden ir desde cómo diseñar un nuevo servicio, cómo migrar una base de datos, que servicio de terceros utilizar, etc. La falta de un proceso de documentación que acompañe el crecimiento del proyecto puede traer problemas a la larga, volver pasos hacia atrás para recordar los motivos de una decisión suele ser una tarea complicada.

El paso del tiempo y la rotación del equipo, si no es acompañada por material que permita la transmisión de conocimiento, resulta en perdida de aprendizajes y experiencias adquiridas. Recordando la primer lección de historia, **"Aquellos que no recuerdan el pasado están condenados a repetirlo"**.

Sin embargo, como mencione anteriormente, este es un problema común, por lo tanto, hay varias posibles soluciones disponibles según tus necesidades. En este post voy a enfocarme en dos herramientas con las que me he sentido particularmente cómodo trabajando, estas son:

1. Formato RFC para generar e iterar propuestas.
1. Formato ADR como registro de decisiones.

## Request for Comments (RFC) para generar e iterar propuestas

El uso de RFC es tan viejo como Internet, incluso más ya que [se uso para timar decisiones en la construcción del WWW (World Wide Web)](https://www.rfc-editor.org/rfc-index.html), sin embargo, su uso se estuvo expandiendo en los últimos años de la mano de proyectos open source como [React](https://github.com/reactjs/rfcs) o [Rust](https://github.com/rust-lang/rfcs).

Básicamente, un documento RFC (Request for Comments) **es una propuesta técnica escrita que incentiva la iteración de la misma por medio de un analisis exhaustivo y el feedback de pares**. El objetivo es conseguir la mejor solución posible para un problema y mitigar el riesgo de complicaciones en el desarrollo, en definitiva, estamos hablando de **tomar mejores decisiones**.

### Ciclo de vida

1. **Propuesta**: Se presenta una propuesta de cambio.
2. **Iteración**: La propuesta es iterada con pares con el fín de encontrar errores o posibilidades de mejora, en este proceso es posible que se detecte que la propuesta no es implementable, en cuyo caso pasa a ser deprecada.
3. **Implementación**: Luego que la propuesta alcanza un nivel de madurez suficiente y el documento está "completo", entonces es momento de implementar la solución.
4. **Mantenimiento**: Una vez implementado, puede que un cambio modifique alguna definición de este documento, en ese caso se puede actualizar el RFC o bien marcarlo como deprecado indicando que otro RFC modifica el comportamiento.

👉 *Idealmente, no se debe modificar el contenido de un RFC ya que sino este perdería su valor histórico, por eso, es mejor cambiar su estado (para que quede claro que el comportamiento varió) y enlazar los documentos relacionados*.

### Ejemplos

- [Notion RFC](https://www.notion.so/RFC-Template-Title-8df1bd0d24b0440486fe133eecdf4a5e).
- [RFC Template | Emanuel Casco](https://github.com/emanuelcasco/document-software-decision-template/blob/main/rfc/template.md).

## Architectural Decision Records (ADRs) como registro de decisiones

Un Architectural Decision Records (ADR) es un **documento que registra una decisión de arquitectura, el contexto en el cual la misma fue tomada y sus consecuencias**. Muchas veces, un ADR es el último paso de un proceso de toma de decisiones que incluyó el armado de un documento RFC, pero esto no siempre tiene que ser así.

Una "Decisión de Arquitectura" se puede definir como *"toda decisión relacionada con el diseño de software que refiere tanto a requerimientos funcionales como a los no funcionales y que es significativa para la arquitectura de nuestro sistema."*_

Algunos de los **beneficios de implementar el uso de ADRs** en tu proceso de desarrollo son los siguientes:

- **Mejora en la transmisión de conocimiento**, ya sea en un ingreso o en una rotación en el equipo. Las personas que se suman al proyecto pueden entender rápidamente el estadio y desarrollo del proyecto simplemente leyendo el registro de ADRs.
- **Mejor alineación entre los miembros del equipo**. Se mitiga el riesgo de decisiones unilaterales que generen impacto en el proyecto sin que hayan sido consensuadas.

### ¿Cuándo crear un ADR?

Para decidir cuándo tengo que escribir un ADR suelo guiarme por [la definición de Josef Blake del equipo de Spotify](https://engineering.atspotify.com/2020/04/14/when-should-i-write-an-architecture-decision-record/):

Como menciona Josef Blake de Spotify en [este post](https://engineering.atspotify.com/2020/04/14/when-should-i-write-an-architecture-decision-record/) Se debe escribir un ADR,  _siempre que hayan tomado una decisión que impacte **significativamente** en cómo tu equipo trabaja._

¿Qué se entiende por _*"significativo"*_? Esta es una definición que debe realizar cada equipo, no hay una regla mágica sino que suele ser una construcción en base al criterio y la practica. Sin embargo, es importante tener en cuenta los siguientes puntos:

- Todo documento RFC debería tener un documento ADR homónimo.
- Si se toma alguna definición "significativa" en una reunión, es importante que la misma quede reflejada en un ADR.

En las siguientes páginas podrán encontrar ejemplos y herramientas para el diseño de ADRs (incluyo también mi template):

- [ADR Tools | Nat Pryce](https://github.com/npryce/adr-tools).
- [ADR | GitHub](https://adr.github.io/).
- [ADR Examples | Joel Parker Henderson](https://github.com/npryce/adr-tools).
- [ADR Template | Emanuel Casco](https://github.com/emanuelcasco/document-software-decision-template/blob/main/adr/template.md).

## Consideraciones

La adopción de estás practicas en tu equipo puede no ser sencilla, los procesos de documentación en el desarrollo de software suelen ser un punto de conflicto en los equipos y hay muchas visiones contrapuestas al respecto.

Mi primer consejo para alguien que quiera mejorar la documentación en un equipo de desarrollo es: paciencia. **Es necesario que la mayoría del equipo este comprometido con el proceso para que este pueda implementarse**.

### Primeros pasos

- **KISS** (Keep It Stupid Simple), **es importante mantener la metodología de trabajo lo más sencilla posible** para que los miembros del equipo se sientan incentivados a seguirla.
- **El proceso debe adaptarse a tu equipo**, no al revés.
- **Da el primer paso**. Una vez definida la plataforma donde generar y persistir los documentos, es una buena idea crear un primer documento de cada tipo. Se puede usar la misma implementación de RFC y ADR como caso de ejemplo para que el resto los use de base.
- También **es una buena idea tener templates** de los documentos, e inclusive un generador, para automatizar la generación de estos archivos. En el [siguiente link](https://github.com/emanuelcasco/document-software-decision-template) comparto un repositorio con templates para ambos tipos de documentos.

### Guía visual de cuándo y cómo documentar

![Diagram Flow to document](/assets/blog/document-with-rfc-and-adr/image01.png)

## Conclusiones

¡Eso es todo! Espero que este post te haya sido de ayuda, dejo debajo un listado de links útiles (varios ya los mencione en el post) por si deseas profundizar en el tema:

- [Templates | Emanuel Casco](https://github.com/emanuelcasco/document-software-decision-template).
- [When should I write an ADR? | Spotify Engineering Blog](~https://engineering.atspotify.com/2020/04/14/when-should-i-write-an-architecture-decision-record/~).
- [ADR Tools | Nat Pryce](https://github.com/npryce/adr-tools).
- [ADR | GitHub](https://adr.github.io/).
- [ADR Examples | Joel Parker Henderson](https://github.com/npryce/adr-tools).
