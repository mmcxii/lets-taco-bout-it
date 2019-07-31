# Let's Taco 'Bout It

[View the site live](https://www.secord.io/lets-taco-bout-it/).

---

## The Problem

The issue LTBI aims to solve is bridging the gap between people (intoxicated, or otherwise) and the delicious tacos they so desperately crave and deserve.

## The Solution

LTBI completes its mission of briging tacos to the people by offering users with a simple choice: make their own tacos, purchase from a nearby restaurant, or be provided with a combined list from both categories. Depending on which option the user selects, one or two API's are then called to return the desired information to the user.

If the user selects to make their own tacos, the [TacoFancy API](https://github.com/evz/tacofancy-api) is called and returns ten random recipes. These recipes can then be favorited and saved for later use using local storage in the browser. The front end of this page was written by [Austin Robbins](https://github.com/Jirafaro) and the back end was written by [John Remeto](https://github.com/Remet0).

If the user selects to browse local restaurants then the [Yelp API](https://www.yelp.com/developers/documentation/v3) is called and the ten nearest restaurants are displayed for the user, as well as some meta information about those restaurants. These restaurants can also be saved for reference later in local storage. Favorites from both categories can be viewed on the same page using the Favorites button in the top right corner of the screen. The front end for this page was written by [Nich Secord](https://github.com/mmcxii), while the back end was written by [Zach Murphy](https://github.com/Munch-Z).

## Planning

During the preproduction phase of this project we as a group came up with a detailed plan for the development of our app. We documented this plan in an outline, which can be found at the provided link:

[Project Outline](https://docs.google.com/document/d/108-7YvqwiA2VUZMrRoRoF0cfLdYyeEbNMxVX9u3ungY/edit?ts=5d2550d0)
