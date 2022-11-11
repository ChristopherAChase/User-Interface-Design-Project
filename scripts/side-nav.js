let mainNavLinks = document.getElementsByClassName('side-nav_link');

const sideNavLinkCount = mainNavLinks.length

function updateSideNavBarSection(){
  const middleOfScreen = window.scrollY + (Math.floor(window.innerHeight/2.0));
  const atTopOfPage = window.scrollY <= Math.floor(window.innerHeight / 8);
  const atBottomOfPage = window.scrollY + window.innerHeight === document.body.offsetHeight;

  for(let i = 0; i < sideNavLinkCount; i++){
    const link = mainNavLinks[i];

    const section = document.querySelector(link.hash);
    
    const isFirstSection = link === mainNavLinks[0];

    const isLastSection = link === mainNavLinks[sideNavLinkCount - 1];
    
    const sectionStartedAboveMiddleOfScreen = section.offsetTop <= middleOfScreen
    
    const sectionEndsBelowMiddleOfScreen = section.offsetTop + section.offsetHeight > middleOfScreen

    if (
      (atTopOfPage && isFirstSection) ||
      (atBottomOfPage && isLastSection) ||
      (sectionStartedAboveMiddleOfScreen && sectionEndsBelowMiddleOfScreen && !atBottomOfPage && !isLastSection && !atTopOfPage && !isFirstSection)
    ) {
      link.classList.add("is-current");
    } 
    else {
      link.classList.remove("is-current");
    }
  }
};

window.addEventListener("scroll", updateSideNavBarSection);
window.addEventListener('load', updateSideNavBarSection)