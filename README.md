# amalgamator

A brainstorming app that uses Dewey Decimal, Roget's Thesaurus hierarchal data and your personal experience(s) to form possible connections. Requires Java 8.1 to run.

Einstein "never lost his sense of woder at the magic of nature's phenomena... He retained the ability to hold two thoughts in his mind simultaneously, to be puzzled when they conflicted, and to marvel when he could smell an underlying unity. People like you and me never grow old, we never cease to stand like curious children before the great mystery into which we were born..." Walter Isaacson: Einstein: His Life and Universe

![Amalgamator App](https://github.com/kappter/amalgamator/blob/master/amalgamation.png)

Business logic notes for the Amalgamator (tough screen capture preventor if possibl):
  * ##User Accounts:
    * Education level, age, location, one link to SM mandate, any other info is optional
  * ##Post Frequency
    * Only one Amalgamation can be exposed/produced to a user inside of one hour 
  * ##AmaCredits 
    * 10 Amalgamations create 1 contribution point (post removal and/or abandonment of topic will decrement contribution points respectively.)
    * One contribution point opens one of two things:
      * the ability to bypass the hour amalgamation timer 
      * the ability to jump to a specific amalgamation id (yes, people will need to know it (foreseeably through internet resources outside the app) and refer to a specific identifier based on adv. algorithm).
  * ##Visibility
    * Once a user creates or contributes to an Amalgamation (a badge), it will be available for edit without a timer.
  * ##Counts 
    * Global count of amalgamations made/left, pioneer achievements and veteran achievements include invites to new systems. 
  * ##Notifications 
    * Any time a user encounters an amalgamation (anon) or contributes/revisits an amalgamation that you are a current contributor on (you have not left) an alert containing a truncated portion of the contributions
    * The only aditional information available to a user considering an amagamation post is the "high volume" notification and users may opt to skip or not contribute setting that id to the very last in a stack a one to many user to amalgamation data structure. 
  * ##Modes of Use 
    * Focused
    * Open 
    * Revisit and edit 
  * ##Posts and Edits can consist of the following:
   * Posts
    * UserID, AmalgamationID, timedate, 255 character text only (stripped of scripts/markup) response field, and status indicator (radio button) with options relating to: plausible, not plausible, and irrelevant.
   * Edits
    * One 255 textonly field with support (twitter logic) for hashtags and URLs etc.
    * Some kind of like or thumbs up counter for follow up posts to an amalgamation
    * Motions: to remove comment, dis-associate user, etc.
