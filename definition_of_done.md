<h1>Definition of Done</h1>

<h2>Testing</h2>

Unit/integration tests are not required for every user story, but will be used if the user story can be reasonably tested with
unit or integration tests. This is because some stories can be unreasonably difficult and/or useless to test with automatic
testing. However, our definition of done requires that all tests that have been written are passing on CircleCI server, because
if some tests won't pass after the commit, then something is probably broken and we should use the stop and fix -principle, 
before the story can be marked as done.

<h2>Code reviews</h2>

Our definition of done requires that the story must be reviewed by another developer after the person who had worked on the 
story thinks that it's ready. Stories that are waiting for the review are in "REVIEW" status in the sprint backlog. After
someone has reviewed the code for the story, it can be marked as done, unless errors are found.

<h2>Tasks</h2>

A story is done if and only if all of its tasks are done.