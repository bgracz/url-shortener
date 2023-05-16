document.getElementById("button1").onclick = 
  function(event) {
    makeUrlShort();
    event.preventDefault();
}

function makeUrlShort() {
    let adres = document.getElementById('url').value;
    document.getElementById('url').value = "let me think...";

    let linkRequest = {
        destination: adres,
        domain: { fullName: "###" }
      }
      
      let requestHeaders = {
        "Content-Type": "application/json",
        "apikey": "###"
      }
      
      $.ajax({
        url: "https://api.rebrandly.com/v1/links",
        type: "post",
        data: JSON.stringify(linkRequest),
        headers: requestHeaders,
        dataType: "json",
        success: (link) => {
          console.log(`Long URL was ${link.destination}, short URL is ${link.shortUrl}`)

          let input = document.createElement("textarea");
          input.value = link.shortUrl;
          document.body.appendChild(input);
          input.select();
          document.execCommand("Copy");
          input.remove();

          document.getElementById('url').value = link.shortUrl;
          document.getElementById('h3').style.opacity = "0.7";
          setInterval(() => {
            document.getElementById('h3').style.opacity = "0";  
          },2000);
        }
      })
}