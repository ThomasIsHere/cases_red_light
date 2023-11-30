# Case Red Light
## Presentation
This is a LWC that displays the number of open cases for 3 categories.
It helps suport team members to spot long time opened cases.

![Component image](https://github.com/ThomasIsHere/cases_red_light/blob/master/assets/lwc_ui.PNG)

## Categories
Categories are defined according to 2 numbers, representing age in days since the Case is open.
Those numbers are customizable in Lightning App Builder.

Let's call them A1 and A2 for age 1 and 2 for the explanation bellow.
* Minimum value is 1 and Maximum is 100
* A1 < A2

Those 3 categories are:
*GREEN: Age <= A1 days
*ORANGE: A1 days < Age <= A2 days
*RED: A2 days < Age

## Action
Refresh: If the number of open cases has changed click on "Refresh" to update the LWC.
Red Alert: This action execute a queuable apex asyn job to add a FeedItem on each red case.

## Why did I created this LWC
I like to use Salesforce and as a user and a developper I wanted to have fun coding something on my free time that I could use in my current job.