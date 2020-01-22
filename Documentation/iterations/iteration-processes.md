# Contents
* [What happens in an iteration](#What-happens-in-an-iteration)
* [Iteration process](#Iteration-process)
* [Stuck and need help](#Stuck-and-need-help)
* [What happens when we finish early](#What-happens-when-we-finish-early)
* [What happens when we do not finish an iteration](#What-happens-when-we-do-not-finish-an-iteration)
* [What is your communication expectations](#What-is-your-communication-expectations)
* [Client Engagement](#Client-Engagement)
* [Coding Standards](#Coding-Standards)

[Link to retrospectives](iterations/retrospectives/retrospective-notes)

# <a name="What happens in an iteration"></a>What happens in an iteration:
An iteration is a two week period where we focus on completing set goals. These set goals can be found on the milestone page.

On the first day we look at the retrospective of the previous sprint. This is to assess our progress so that we can evaluate how to approach our next iteration.

An iteration should have no more than 65 hours of work assigned to account for management and communication time.

# <a name="Iteration process"></a>Iteration process:
The steps of an iteration are as follows:
1. A retrospective meeting with Shima to cover:
  * What was good and bad about the last iteration.
  * Ideas for improving our process
  * Actions to take going forward.
2. Altering our process documentation to cover anything that comes up in the retrospective.
3. A team meeting to cover the following:
  * Filling everyone in on the state of the project and specific features so the everyone has at least a basic understanding of all parts of the project.
  * Taking the "stories" assigned to the current iteration and as a full team on the whiteboard split them into the smaller issues.
  * Filling out time estimates for each issue and adjusting the work load accordingly.
  * Filling those issues into GitLab with descriptions.
  * Assigning starting issues to people
4. Starting work on the issues assigned to each person.
5. Comment, document, and keep track of time on the GitLab.
6. Finnish issue and repeat 4-5 till end of week.
7. Hold a mid iteration meeting to cover progress and any issues that haven't been covered yet.
8. Repeat 4-5.

# <a name="Adding issues to Kanban board"></a>Adding issues to Kanban board:
When adding an issue to the Kanban board the following rules must be followed:
1. Issue must have a brief but descriptive title.
2. Issues must have a full description such that any group member relatively familiar with the code base can by reading it gain enough information to start independent work on the task. This should include where possible pictures, pseudocode, suggestions of possible solutions, code quotes and useful resources.
3. If the issue is for the current iteration there must be a discussion with at least one other group member to ascertain a realistic minimum and maximum time estimate to complete the task. The maximum will then be listed as the estimate on the issue and will be repeated in the weight section for visibility from the board view. Otherwise this will be done at the start of the iteration it is to be done in.


# <a name="Stuck and need help"></a>Stuck and need help:
When working independently, you may get stuck on an issue. Before you start, estimate how long you will take and time-box yourself to figure out the problem at hand. If you can't come up with a solution or are making slow progress, then after 30 minutes comment on your issue and request help from a team member.

When joining a team member on a issue, follow a similar protocol of time boxing yourself. In addition, Thoroughly plan your approach to the issue with the other team member/members to ensure that you have a shared understanding of the problem and a clear direction to fixing it.

If after getting aid from a team member the issue persists and is of at least moderate importance then when time allows a team white board session will be held to come up with a solution to the issue.

# <a name="What happens when we finish early"></a>What happens when we finish early:
If we finish the iteration before the deadline then we will spend the remaining time removing bugs and possibly adding requested features from our client, Matt. Furthermore, we will consider the time required to complete our tasks when approaching our next iteration.

# <a name="What happens when we do not finish an iteration"></a>What happens when we do not finish an iteration:
We plan time in our weekend to catch up if necessary and in our iteration meeting we will revise the new iteration goals to make sure that they are achievable in the time frame given. This means the workload may be reduced by distributing the workload to other iterations.

# <a name="What is your communication expectations"></a>What is your communication expectations:
In order to be efficient, you are expected to reach out to the team when you are stuck and need help. Any changes that will affect others must be reported.

Moreover, when necessary we shall contact our client, Matt Plummer. We need to communicate our progress and opinion of what was implemented to Matt and get feedback from him on our progress and next steps.

# <a name="Client Engagement"></a> Client Engagement:

Client meetings should be arranged at the end of major iterations that lead to a visible change in the platform. Emails will be sent out at the end of each iteration detailing what has been achieved and what we have planned for the future.

Emails to be sent must be proofread by at least two other members of the team.

Note that we have only managed to arrange one client meeting at the end of a major iteration because our client has been away on Holiday for the majority of Trimester Two.

# <a name="Coding Standards"></a> Coding Standards:

For JavaScript we use the [Prettier](https://prettier.io/docs/en/) plugin. For Python we use [Flake8](https://github.com/dreadatour/Flake8Lint). Both of which are installed when you run `yarn install`. They run on save to correctly format your code.
