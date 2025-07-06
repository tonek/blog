---
author: Anton Safonov
pubDatetime: 2025-07-05
title: Practical guide to AI for coding at scale
slug: practical-guide-for-ai-coding
featured: true
draft: false
tags:
  - ai
  - devplan
description:
  Learnings on how to apply AI coding at scale in practice.
---

I’ve been a Software Engineer for nearly 20 years, from startups to Big Tech Principal Engineer role, the past ~10 years I have mostly been working on massive-scale infra. Until late 2024, I was skeptical about AI for real software development. After leaving my day job to start a new venture with a few partners, they pushed me to incorporate AI tools into my workflow. I resisted at first, but after extensive trial and error, I found a process that works. It’s made me 2-3x more productive, and I want to share exactly how.

Caveat: the process will mostly work for experienced people or anyone willing to lean into Tech Lead-type work: scoping projects, breaking them down, preparing requirements, etc. Think of AI as a team of Junior Engineers you now manage.

First I will describe high level approaches that work for me and then will describe exactly what and how I get stuff done with AI.

So here are the main things that allowed me to scale:

1. **Parallelization**. The biggest gain - running multiple projects in parallel. Proper environment, processes and approaches allow me to run 5-6 streams of work at once, YMMV. I will share below what exactly that means for me, but it is pretty close to managing your own small dev team.
2. **Requirements**. Clear, detailed high level product and technical requirements before writing code. A lot was written about that in relation to the AI coding. The better the context you provide, the better the results you get.
3. **Backlog**. Maintain a steady pipeline of well-defined projects with clear requirements (see #2) that are ready to be picked up at any time.
4. **Design**. Maintain high quality overall design of the system. AI does so much better when things are clean and clear and when areas of your system has clear responsibilities and interfaces. Every hour you invest into polishing overall design will bring many-fold returns in the future.
5. **Maintainability**. ****Review and polish every single change AI-creates, keep your codebase maintainable by humans**.** One thing AI is not is lazy. AI agents are eager to write A LOT of code, they are not shy of copy-pasting and can quickly turn your codebase into unmanageable mess, we all know what happens when the codebase becomes hard to maintain.

Now let me go into details of how exactly I apply these rules in practice.

## Parallelization

Most my working mornings start with making 2 decisions:

1. **What projects need my personal focus?**
   Projects I code mostly myself, possibly with AI assistance.
2. **What projects can I hand off to my AI team?**
   3-6 small, independent tasks I will let AI to start working on.

### How I Pick “My” Projects

Below are some of the features that may indicate that I better work on the project myself. You may have different ones depending on what you enjoy, your experience, etc.

- Require some important design decisions to make, significant amount of future work will be based on its outcome.
- Require non-trivial research and hard to change decisions will be made, e.g. do you store some data in SQL DB or offload to S3 or use some cache.
- Very specific and intricate UI work, usually designed by a designer. While AI generally does OK with standard web UIs, some heavily used or nuanced components still may be better delegated to humans.
- Are just fun! Enjoying your work matters for productivity (in my case - actually a lot).

### How I Pick AI Projects

Choosing AI projects well is critical. You want projects that are:

1. **Non ambiguous**. Clear product and tech requirements, minimal guesswork. Most/all risky parts should be figured out ahead of time. I will talk about that more below in Requirements.
2. **Independent** - no overlapping code, avoids merge conflicts.
3. **Relatively small**. I target projects I could finish myself in 2-6 focused hours. Bigger = messier reviews, more AI drift. Bigger projects bear reduced chance of getting it done in a day.

Once AI projects are chosen I clone repositories where they need to be implemented and open a separate instance of IDE in each. This does come with quite a few technical requirements I will cover below in the Design section (e.g. relatively small repos, should be able to quickly set up a freshly cloned one, etc). Choosing right IDE is quite an important topic by itself. To run 5-6 projects in parallel you need a *good* IDE which:

- Can finish significant amount of work relatively independently.
- Respects existing code layout.
- Notifies you when it gets stuck.
- Analyzes codebase, best practices, tooling, etc before rushing into coding.

I don’t really care about speed here (whether it starts coding in 1 minute or after 30 minutes of thinking), I would much rather my IDE to be slower but produce higher quality results by itself without my constant guidance. I tried quite a few and my personal choice is Jetbrains IDEs with Junie which I highly recommend, but all IDEs evolve so fast that it is hard to say which one will work better tomorrow.

Once repos are cloned, I copy detailed requirements into the rules files of my IDE and ask it to implement the project. There are a few non-obvious things I found valuable when dealing with AI IDEs working in parallel:

1. **Refine requirements and restart instead of chatting**. If AI decided to go direction you don’t want it to go, I found it more scalable (unless it is something minor) to go back to the technical or product requirements, update them and let AI to start over. I found it much more time consuming to ask AI to refactor what it already did than starting fresh with more specific requirement. E.g. if AI starting to implement its own version of MCP server, I will restart with an ask to use an official SDK instead of asking to refactor. Having said that, it was initially hard to treat the code which AI wrote as disposable, but it really is if you haven’t invested a lot of your own time in it.
2. **Only start polishing when you are satisfied with high level approach**. Do not focus on minor details until you see that high level approach is right and you feel that what AI wrote is likely good enough to be polished and merged. Remember point #1 above. You may need to start over and you don’t want to spend time polishing code that will be erased later.

Then I switch between reviewing AI’s code, starting over some of their projects, polishing their code and my own projects. It really feels close to having a team of 4-6 junior people working with you, with all the corresponding overhead: context switching, merge conflicts, research, reviews, clarifying requirements, etc.

### Summary Of Daily Routine

So overall my daily routine looks like that:

1. Assign projects to myself and my AI team.
2. Clone git repos into independent locations and run separate instances of IDE in each. Separate copies of repos are very important for parallelization.
3. Ask AI in the corresponding IDEs to work on their projects.
4. Work on my projects while checking in with AI team once in a while, for me - maybe once or twice an hour or when they let me know they need some input (a.k.a. jumping IDE icon in toolbar).
5. Iterate on requirements for projects that went wrong direction and restart them.
6. Test and polish each project.
7. *[Extra hack] I also have a separate pool of tiny projects that I have high confidence of AI finishing 90+% by itself. I ask AI to implement one of those before I go out for a lunch or before I have some other break.*

I don’t always finish all the projects I start in a day, but more often than not, most or all of them get to pretty decent state to get finished next day. I just pick unfinished ones at a step 1 above the next day.

## Requirements

For the parallel execution to work, it is very important to set up your AI agents for success. Approach them *almost* the same way you would approach Junior Engineers on your team: you want to give them some freedom and not micromanage, but you also want to give very clear product, technical and non-functional requirements, reduce ambiguity. Unlike real engineers though, you’re not mentoring AI. You don’t leave room for exploration — you specify exactly what you want. So requirements for each project should:

1. **Be exhaustive**. They should cover exactly what you want to accomplish, how things should work, include acceptance criteria in some form, etc.
2. **Include what’s out of scope**. More often than not, you want to leave some specific parts out of scope for the current version of the project. Spell them out. Remember, AIs are not lazy, they are happy to code all day every day, so set the clear boundaries.
3. **Provide clear technical requirements**. Which part of the system the code should reside in, what storage to use, how to update DB schema, what kind of tests to add, etc. Some of that, e.g. test approaches, can be written once and just repeated for every project or even merged into the repository as static rules.
4. **Stay up-to-date**. As mentioned in Parallelization section, if something needs to be clarified to get better results, it should be reflected in the updated requirements. That allows to persist that context and carry over to next attempt of execution if we decide to start the project from scratch.

What that means is that you likely should be keeping requirements separate from AI agent’s chat and work on them before you open your IDE.

In my personal case, product requirements are actually often coming from my partner who mostly focuses on the product side of what we build. So he comes up with product requirements and I then cover technical requirements and considerations before picking up the task for implementation.

## Backlog

In order to start working on 3-6 projects in the morning, it is essential to have those projects defined and ready. It is pretty similar to how I was running teams in Big Tech as a tech lead - each member of the team needs to know what they should be working on now and what’s next. That requires planning ahead, maintaining backlog, etc. If you are not used to that kind of work, then you may need to go through some adjustments, but it is well worth it. Your goal is ideally to have at least 5-7 well defined projects every day or spend some time in the morning to prepare them before you start working.

## Design

With the current state of AI-assisted development, AI performs way better inside clean, well-designed systems. But don’t expect it to create that architecture for you, or fix a bad one. That’s still your job. So, here are the good news: everything we learned in the past decades about how to approach software development at scale still applies to the AI world and maybe even more than before. All the best practices are still relevant: clean architecture, tests coverage, well understood design patterns, clear separations of responsibilities, code reviews, preferring well-known libraries to obscure ones, etc. We had these best practices for many years because they help humans to be more efficient in the long run, similarly - they help AI to be more efficient as well.

What that means in practice - even for side projects it may be beneficial overall to spend a little more time on creating proper abstractions, separating modules with clear interfaces, setting up robust testing approaches and applying other best practices. It also means need to make sure that new code follows existing design decisions and that overall system design stays simple. I don’t know how AI-coding agents will evolve, but as of now they perform significantly better when from the code structure it is clear what goes where and which module is responsible for what.

## Maintainability

Another outcome of having good design which I wanted to put into its own category is generally keeping your codebase in a maintainable state.

What that means in practice - you need to treat all the code AI writes to be your own. You should apply all the same quality requirements to the AI written code as you do for human written code. It may cause tensions during PR reviews of colleagues who used AI to write some mediocre quality solutions and didn’t spend enough time polishing them, but quality can regress very-very quickly if you let AI changes go into codebase with a lower bar. In fact, this is the main reason why I claimed at the beginning that my throughput is 2-3x while I am describing a process where AI implements 5-6 projects a day “for me”, which is 5-6x more than I do myself usually. I have to spend a lot of time finishing and cleaning up AI code.

# The Tooling

Now to the specific tools I use.

1. Research and exploration - perplexity, chatgpt (unsurprisingly). Great for quick technical research, comparing approaches, or clarifying unknowns. Remember, we need to clarify as many ambiguities as possible before start writing code?
2. Generation of rules for IDE - that requires combining product and tech requirements + some context about codebase to create a prompt. Tried quite a few tools there - Repomix + Gemini work well for repo analysis, tried taskmaster and some other tools.
   Now using mostly Devplan due to some enhanced automation and integrated repo analysis. The key point here is to keep those rules separate from your IDE instance so that you can start over with an updated version of a rule.
3. IDE (super important) - Jetbrains IDEs with Junie (mostly Pycharm, Golang and Webstorm for me). Tried Cursor, Windsurf, Claude Code. Found Claude to be also very interesting, but have been using JB products for many years and quite happy with Junie’s performance now. Choose IDE wisely - every extra follow up you need to provide to IDE is an additional context switch. For my flow it is better to have IDE to complete 70% of the task autonomously than 90% with 15 hints/suggestions from me.

# Final Thoughts

AI can be a true force multiplier, but it is hard work to squeeze all these productivity gains. I had to adapt a lot to this brave new world to get what I am getting now. Having said that, I am now in a small venture with just a few people, so although I think it would also work in some of my previous companies with many thousands of engineers, I can’t test that theory.

Curious to hear if others managed to scale AI-based development beyond obvious cases of boilerplate, writing tests, debugging issues, etc - what's working and what’s not for you?

---