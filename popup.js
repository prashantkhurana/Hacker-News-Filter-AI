document.addEventListener("DOMContentLoaded", function () {
    // Get the filtered links from storage
    chrome.storage.local.get("filteredLinks", function (result) {
      const links = result.filteredLinks;
      if (links) {
        const linksList = JSON.parse(links);
        // Display the filtered links
        const linksDiv = document.querySelector(".links");
        for (let i = 0; i < linksList.length; i++) {
          const link = linksList[i];
          const linkDiv = document.createElement("div");
          linkDiv.classList.add("link");
          const linkTitle = document.createElement("a");
          linkTitle.textContent = link.title;
          linkTitle.href = link.url;
          linkDiv.appendChild(linkTitle);
          linksDiv.appendChild(linkDiv);
        }
      } else {
        const noLinksDiv = document.createElement("div");
        noLinksDiv.textContent = "No links found";
        const linksDiv = document.querySelector(".links");
        linksDiv.appendChild(noLinksDiv);
      }
    });
  });  