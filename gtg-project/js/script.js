const menuIcon = document.querySelector('.menuicon');
const menuWrap = document.querySelector('.menu-wrap');
const html = document.documentElement;

// Toggle menu
menuIcon.addEventListener('click', function (e) {
  e.stopPropagation();
  this.classList.toggle('open');
  menuWrap.classList.toggle('active');
  html.classList.toggle('hide');
});

// Close menu on document click
document.addEventListener('click', function () {
  closeMenu();
});

// Close when clicking a menu link
menuWrap.addEventListener('click', function (e) {
  if (e.target.closest('a')) {
    closeMenu();
  } else {
    e.stopPropagation();
  }
});

function closeMenu() {
  menuIcon.classList.remove('open');
  menuWrap.classList.remove('active');
  html.classList.remove('hide');
}
//

//carousel script
const thumbs = document.querySelectorAll(".thumb");
const mainImage = document.getElementById("mainImage");
const dots = document.querySelectorAll(".dot");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentIndex = 0;

// Getting thumbnail image
const images = Array.from(thumbs).map(thumb => thumb.src);

// slider main image
function updateSlider(index) {
  currentIndex = index;
  mainImage.src = images[currentIndex];

  dots.forEach((d, i) => d.classList.toggle("active", i === currentIndex));
  thumbs.forEach((t, i) => t.classList.toggle("active", i === currentIndex));
}

prevBtn.onclick = () => {
  const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
  updateSlider(newIndex);
};

nextBtn.onclick = () => {
  const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
  updateSlider(newIndex);
};

// Thumbnail click
thumbs.forEach((thumb, i) => {
  thumb.addEventListener("click", () => updateSlider(i));
});

// Dots click
dots.forEach((dot, i) => {
  dot.addEventListener("click", () => updateSlider(i));
});
//
document.addEventListener("DOMContentLoaded", () => {

  const section = document.querySelector("#GradientBg");
  const counters = document.querySelectorAll("#GradientBg .each-item h4");
  let started = false;

  const startCounting = () => {
    counters.forEach(counter => {
      const finalValue = parseInt(counter.dataset.value);
      let current = 0;

      const updateCounter = () => {
        current++;
        counter.textContent = current + "%";

        if (current < finalValue) {
          requestAnimationFrame(updateCounter);
        }
      };

      requestAnimationFrame(updateCounter);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          if (!started) {
            started = true;
            startCounting();
          }
        }
      });
    },
    {
      threshold: [0.5]
    }
  );

  observer.observe(section);

});



//jquery used for smooth transisition
(function ($) {
  $(document).ready(function () {
    //subscription radio button click
    $(".sub-type").on("click", function () {
      const parent = $(this).closest(".each-subscription");
      const detail = parent.find(".sub-pro-detail");
      const thisRadio = $(this).find("input[type='radio']");
      parent.find(".product-list .each-product").removeClass("active");
      parent.find(".product-list .radio-wrap").removeClass("active");
      parent.find(".product-list input[type='radio']").prop("checked", false);

      $("#AddtoCart .primary-cta").removeAttr("href");

      $(".subscription .sub-type input[type='radio']").prop("checked", false);
      thisRadio.prop("checked", true).trigger("change");

      $(".each-subscription").not(parent).each(function () {
        $(this).removeClass("active");
        $(this).find(".sub-type").removeClass("active");
        $(this).find(".sub-pro-detail").slideUp(300);
      });
      parent.addClass("active");
      $(this).addClass("active");
      detail.slideDown(300);
    });
    // 
    $(".subscription .each-subscription:first-child .sub-type").trigger("click");
    //Accordion script
    $(".each-accordion .acc-title").click(function () {
      var dis = $(this),
        disNext = dis.next(".acc-desciption"),
        disSibs = dis.parents(".each-accordion").siblings();
      dis.addClass("active");
      disSibs.find(".acc-title").removeClass("active");
      disNext.slideDown();
      disSibs.find(".acc-desciption").slideUp();
      dis.parents(".each-accordion").toggleClass("active-bg").siblings().removeClass("active-bg");
    });
    //
    $("#Accordian .each-accordion:first-child .acc-title").trigger("click");
    //product onclik URL
    $(".product-list .each-product").on("click", function () {

      const product = $(this);
      const list = product.closest(".product-list");
      const wrap = product.find(".radio-wrap");
      const radio = product.find("input[type='radio']");
      const url = radio.data("url");

      // Remove active from siblings
      list.find(".each-product").removeClass("active");
      list.find(".radio-wrap").removeClass("active");

      // Uncheck sibling radios
      list.find("input[type='radio']").prop("checked", false);

      // Activate current
      product.addClass("active");
      wrap.addClass("active");

      // Check radio + trigger change
      radio.prop("checked", true).trigger("change");

      // Update Add to Cart link
      if (url) {
        $("#AddtoCart .primary-cta").attr("href", url);
      }

    });
    $(".product-list input[type='radio']").on("click", function (e) {
      e.stopPropagation();
    });

  });


})(jQuery);
//
const activeRadio = $(".product-list .each-product.active input[type='radio']");
if (activeRadio.length) {
  $("#AddtoCart .primary-cta").attr("href", activeRadio.data("url"));
}