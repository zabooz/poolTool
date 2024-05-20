const config = {
  targetId: "#poolToolDiv",

  poolTypes: [
    {
      image: "./img/naturpool.jpg",
      name: "Naturpool",
      description: "Ein Pool direkt aus der Natur",
      quality: 3,
      plants: 1,
      animals: 1,
      maintenance: 1,
      technic: 2,
      algae: 1,
      color: "rgb(63, 148, 67)",
    },
    {
      image: "./img/schwimmteich.jpg",
      name: "Schwimmteich",
      description: "Ein Teich zum schwimmen",
      quality: 1,
      plants: 2,
      animals: 2,
      maintenance: 1,
      technic: 1,
      algae: 3,
      color: "rgb(78, 120, 199)",
    },
    {
      image: "./img/kombiteich.jpg",
      name: "Kombiteich",
      description: "Eine Kombination aus Pool und Teich",
      quality: 2,
      plants: 2,
      animals: 1,
      maintenance: 3,
      technic: 2,
      algae: 1,
      color: "rgb(57,123,117)",
    },
  ],
  lang: {
    quality: "Wasserqualität",
    plants: "Pflanzen",
    animals: "Tiere",
    maintenance: "Pflegeaufwand",
    technic: "Technik",
    algae: "Algen",
    noSelection:
      "Wähle ein Bild aus und erkenne auf einen Blick, was dich erwartet!",
    chartText:
      "Die Qualität des Wassers, die Pflanzen, die Tiere, der Pflegeaufwand, die Technik und die Algenbildung sind die wichtigsten Unterschiede zwischen den verschiedenen Pooltypen.",
  },
};

let chart;
const poolTool = {
  execute: (config) => {
    poolTool.createLayout(config);
    poolTool.createInfoText(config);
    poolTool.createDescription(config.lang.noSelection);

    window.addEventListener("resize", () => {
      poolTool.createLayout(config);
      poolTool.createInfoText(config);
      poolTool.createDescription(config.lang.noSelection);

      chart = undefined;
    });
  },

  createLayout: (config) => {
    const target = document.querySelector(config.targetId);
    target.innerHTML = "";

    const mainDiv = document.createElement("div");
    mainDiv.id = "mainDiv";

    target.appendChild(mainDiv);

    const header = document.createElement("p");
    header.id = "header";
    header.classList.add("uk-margin", "uk-text-center", "uk-text-bold");
    header.innerText = config.lang.noSelection;

    mainDiv.appendChild(header);

    const contentContainer = document.createElement("div");
    contentContainer.id = "contentContainer";
    contentContainer.setAttribute("uk-grid", "");
    contentContainer.classList.add(
      "uk-flex-nowrap",
      "uk-flex-middle",
      "uk-width-1-1@m",
      "uk-flex-align-items",
      "uk-grid-small@s"
    );
    mainDiv.appendChild(contentContainer);

    const imageGrid = document.createElement("div");
    imageGrid.id = "imageGrid";
    imageGrid.setAttribute("uk-grid", "");
    imageGrid.classList.add(
      "uk-width-2-3@l",
      "uk-text-center",
      "uk-flex-center",
      "uk-flex-nowrap",
      "uk-grid-small@m",
      "uk-flex-responsive",
      "uk-flex-align-items",
      "uk-width-2-3@m",
      "uk-width-1-2@s",
      "uk-width-1-1"
    );

    poolTool.createImage(imageGrid);

    contentContainer.appendChild(imageGrid);

    const chartDiv = document.createElement("div");
    chartDiv.id = "chartDiv";
    chartDiv.classList.add(
      "uk-width-1-2@s",
      "uk-text-center",
      "uk-width-1-2@m",
      "uk-flex-align-items"
    );

    
    contentContainer.appendChild(chartDiv);
  },
  createDescription: (descriptionText) => {
    const description = document.querySelector("#header");

    description.classList.add(
      "uk-text-center",
      "uk-margin-top",
      "uk.margin-bottom",
      "uk-text-bold",
      "descriptionStyle"
    );

    description.textContent = descriptionText;
  },
  createInfoText: (config) => {
    const chartDiv = document.querySelector("#chartDiv");
    chartDiv.innerHTML = "";
    const infoText = document.createElement("p");
    infoText.id = "infoText";
    infoText.textContent = config.lang.chartText;
    infoText.classList.add(
      "uk-text-center",
      "uk-flex-align-items",
      "responsive-font-size"
    );
    chartDiv.appendChild(infoText);
  },
  createImage: (imageGrid) => {
    config.poolTypes.forEach((pool) => {
      const imageContainer = document.createElement("div");
      imageContainer.classList.add(
        "image-container",
        "uk-width-1-1",
        "uk-flex-center",
        "uk-flex-middle",
        "uk-width-auto@s"
      );

      imageContainer.style.overflow = "hidden";
      imageContainer.style.cursor = "pointer";
      imageContainer.style.position = "relative";

      const img = document.createElement("img");
      img.src = pool.image;
      img.alt = pool.name;
      img.style.width = "100%";
      img.style.transition = "transform 0.5s ease";

      const imgText = document.createElement("div");
      imgText.id = "imgText";
      imgText.classList.add("imgText-style");
      imgText.innerText = pool.name;

      const overlay = document.createElement("div");
      overlay.classList.add(
        "uk-overlay",
        "uk-overlay-primary",
        "uk-position-cover"
      );
      overlay.style.opacity = "0";
      overlay.style.transition = "opacity 0.5s ease";

      imageContainer.append(img, imgText, overlay);

      imageContainer.addEventListener("mouseenter", () => {
        img.style.transform = "scale(1.2)";
        overlay.style.opacity = ".9";
      });
      imageContainer.addEventListener("mouseleave", () => {
        img.style.transform = "scale(1)";
        overlay.style.opacity = "0";
      });

      const border = document.createElement("div");
      border.className = "border hidden borderDiv";

      const borderCon = document.createElement("div");
      borderCon.classList.add(
        "borderContainer",
        "uk-width-1-3",
        "uk-flex-center",
        "uk-flex-middle",
        "uk-width-auto@s"
      );
      borderCon.append(imageContainer, border);

      borderCon.addEventListener("click", () => {
        chart === undefined ? poolTool.createChart(pool) : null;
        poolTool.updateRenders(borderCon, pool);
      });

      imageGrid.appendChild(borderCon);
    });
  },
updateRenders: (borderCon, poolType) => {
    const imgConArr = document.querySelectorAll(".borderContainer");

    let isSelected = false;

    imgConArr.forEach((con) => {
        const borderDiv = con.querySelector(".borderDiv");
        if (borderDiv.classList.contains("visible")) {
            if (con === borderCon) {
                isSelected = true; 
            }
            borderDiv.classList.remove("visible");
            borderDiv.classList.add("hidden");
        }
    });

    if (!isSelected) {
        const borderDiv = borderCon.querySelector(".borderDiv");
        borderDiv.classList.add("visible");
        borderDiv.classList.remove("hidden");
        poolTool.updateChart(poolType);
        poolTool.createDescription(poolType.description);
    } else {
        poolTool.createDescription(config.lang.noSelection);
        poolTool.createInfoText(config);
        chart = undefined;
    }
},


  createChart: (poolType) => {
    const chartDiv = document.querySelector("#chartDiv");
    const imageGrid = document.querySelector("#imageGrid");
    const labels = Object.keys(poolType).filter(
      (key) => typeof poolType[key] === "number"
    );
    const data = Object.values(poolType).filter(
      (value) => typeof value === "number"
    );
    const backgroundColor = poolType.color;

    barThickness =
      window.innerWidth < 640
        ? 30
        : window.innerWidth < 855
        ? 25
        : window.innerWidth < 960
        ? 25
        : window.innerWidth < 1280
        ? 25
        : 15


    if(window .innerWidth < 960 || window.innerWidth > 1280) {

      var indexAxis = "y"; 
      var yAxis = {
        ticks: {
          beginAtZero: true,
        },
      };
      var xAxis = {
        max: 3,
        min: 0,
        ticks: {
          callback: function (value) {
            if (value === 0) {
              return "0";
            } else if (value === 1) {
              return "niedrig";
            } else if (value === 2) {
              return "mittel";
            } else if (value === 3) {
              return "hoch";
            }
          },
          stepSize: 1,
          autoSkip: false,
          beginAtZero: true,
        },
      };

    }else{
        
       var indexAxis = "x";
        var yAxis = {
          max: 3,
          min: 0,
          ticks: {
            callback: function (value) {
              if (value === 0) {
                return "0";
              } else if (value === 1) {
                return "niedrig";
              } else if (value === 2) {
                return "mittel";
              } else if (value === 3) {
                return "hoch";
              }
            },
            stepSize: 1,
            autoSkip: false,
            beginAtZero: true,
          },
        };
        var xAxis = {
          ticks: {
            beginAtZero: true,
          },
        };
    }


    chartDiv.style.height = imageGrid.clientHeight + "px";

    const ctx = document.createElement("canvas");
    ctx.id = "myChart";
    ctx.style.height = "100%";
    chartDiv.innerHTML = "";
    chartDiv.appendChild(ctx);

    chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels.map((label) => config.lang[label]),
        datasets: [
          {
            label: "",
            data: data.map((value) => (value === 0 ? 0.1 : value)),
            backgroundColor: backgroundColor,
            borderWidth: 1,
            barThickness: barThickness,
          },
        ],
      },
      options: {
        responive: true,
        maintainAspectRatio: false,
        indexAxis: indexAxis,
        scales: {
          y: yAxis,
          x: xAxis,
        },
        plugins: {
          legend: {
            display: false,
          },
          animation: {
            duration: 1200,
            easing: "easeInOutQuad",
          },
        },
      },
    });
  },
  updateChart: (poolType) => {
    const labels = Object.keys(poolType).filter(
      (key) => typeof poolType[key] === "number"
    );

    const data = labels.map((label) => poolType[label]);

    const backgroundColor = poolType.color;

    chart.data.labels = labels.map((label) => config.lang[label]);
    chart.data.datasets[0].data = data.map((value) =>
      value === 0 ? 0.1 : value
    );
    chart.data.datasets[0].backgroundColor = backgroundColor;
    chart.data.datasets[0].barThickness = barThickness;
    chart.update();
  },





};
