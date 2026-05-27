(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.querySelectorAll(".nav__link").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const form = document.getElementById("contact-form");
  if (form) {
    const TO_EMAIL = "edgarweberber@gmail.com";
    const topicLabels = {
      invest: "项目投资合作",
      resource: "资源对接",
      brand: "乡创品牌入驻",
      media: "媒体采访",
      other: "其他",
    };

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = form.name.value.trim();
      const phone = form.phone.value.trim();
      const message = form.message.value.trim();

      if (!name || !phone || !message) {
        form.reportValidity();
        return;
      }

      const company = form.company.value.trim();
      const email = form.email.value.trim();
      const topic = topicLabels[form.topic.value] || form.topic.value;

      const subject = encodeURIComponent(
        "【醉美乡投官网留言】" + topic + " - " + name
      );
      const body = encodeURIComponent(
        [
          "咨询类型：" + topic,
          "姓名：" + name,
          company ? "单位：" + company : "",
          "电话：" + phone,
          email ? "邮箱：" + email : "",
          "",
          "留言内容：",
          message,
        ]
          .filter(Boolean)
          .join("\n")
      );

      window.location.href =
        "mailto:" + TO_EMAIL + "?subject=" + subject + "&body=" + body;

      const success = document.getElementById("form-success");
      if (success) {
        success.hidden = false;
      }
    });
  }
})();
