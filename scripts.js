let contacto = document.getElementById("contacto"); //div de contacto
let cuerpo = document.getElementById("cuerpo");
let integrantesSP = document.getElementById("integrantesSP");
let formulario = document.getElementById("wizardform");
let blog = document.getElementById("blog");
window.addEventListener("load", inicio);

let btnContacto = document.getElementById("btn-contacto"); //boton/link del header
let btnCuerpo = document.getElementById("btn-cuerpo");
let btnNosotros = document.getElementById("btn-nosotros");
let btnWizard = document.getElementById("btn-wizard");
let btnBlog = document.getElementById("btn-blog");

btnContacto.addEventListener("click", mostrarContacto);
btnCuerpo.addEventListener("click", mostrarCuerpo);
btnNosotros.addEventListener("click", mostrarCuerpo);
btnWizard.addEventListener("click", mostrarFormulario);
btnBlog.addEventListener("click", mostrarBlog);

function inicio() {
  contacto.style.display = "none";
  formulario.style.display = "none";
  blog.style.display = "none";
}

function mostrarContacto() {
  contacto.style.display = "grid";
  cuerpo.style.display = "none";
  integrantesSP.style.display = "none";
  formulario.style.display = "none";
  blog.style.display = "none";
}
function mostrarCuerpo() {
  contacto.style.display = "none";
  cuerpo.style.display = "block";
  integrantesSP.style.display = "block";
  formulario.style.display = "none";
  blog.style.display = "none";
}
function mostrarFormulario() {
  contacto.style.display = "none";
  cuerpo.style.display = "none";
  integrantesSP.style.display = "none";
  formulario.style.display = "block";
  blog.style.display = "none";
}

function mostrarBlog() {
  contacto.style.display = "none";
  cuerpo.style.display = "none";
  integrantesSP.style.display = "none";
  formulario.style.display = "none";
  blog.style.display = "block";
}


function scroll_to_class(element_class, removed_height) {
  var scroll_to = $(element_class).offset().top - removed_height;
  if ($(window).scrollTop() != scroll_to) {
    $("html, body").stop().animate({ scrollTop: scroll_to }, 0);
  }
}

function bar_progress(progress_line_object, direction) {
  var number_of_steps = progress_line_object.data("number-of-steps");
  var now_value = progress_line_object.data("now-value");
  var new_value = 0;
  if (direction == "right") {
    new_value = now_value + 100 / number_of_steps;
  } else if (direction == "left") {
    new_value = now_value - 100 / number_of_steps;
  }
  progress_line_object
    .attr("style", "width: " + new_value + "%;")
    .data("now-value", new_value);
}

$(document).ready(function () {
  $('form[id="formulario"]').validate({ 
    rules: {
      nombre: 'required',
      correo: {
        required: true,
        email: true,
      },
      comentario: 'required',
    },
    messages: {
      nombre: 'Este campo es obligatorio',
      correo: 'Ingrese un correo electronico válido',
      comentario: 'Este campo es obligatorio',
    },
    submitHandler: function(form) {
      form.submit();
    }
  });

  $(".f1 fieldset:first").fadeIn("slow");

  $('.f1 input[type="text"], .f1 input[type="password"], .f1 textarea').on(
    "focus",
    function () {
      $(this).removeClass("input-error");
    }
  );

  // next step
  $(".f1 .btn-next").on("click", function () {
    var parent_fieldset = $(this).parents("fieldset");
    var next_step = true;

    // navigation steps / progress steps
    var current_active_step = $(this).parents(".f1").find(".f1-step.active");
    var progress_line = $(this).parents(".f1").find(".f1-progress-line");

    // fields validation
    parent_fieldset
      .find('input[type="text"], input[type="password"], textarea')
      .each(function () {
        if ($(this).val() == "") {
          $(this).addClass("input-error");
          next_step = false;
        } else {
          $(this).removeClass("input-error");
        }
      });

    // fields validation

    if (next_step) {
      parent_fieldset.fadeOut(400, function () {
        // change icons
        current_active_step
          .removeClass("active")
          .addClass("activated")
          .next()
          .addClass("active");
        // progress bar
        bar_progress(progress_line, "right");
        // show next step
        $(this).next().fadeIn();
        // scroll window to beginning of the form
        scroll_to_class($(".f1"), 20);
      });
    }
  });

  // previous step
  $(".f1 .btn-previous").on("click", function () {
    // navigation steps / progress steps
    var current_active_step = $(this).parents(".f1").find(".f1-step.active");
    var progress_line = $(this).parents(".f1").find(".f1-progress-line");

    $(this)
      .parents("fieldset")
      .fadeOut(400, function () {
        // change icons
        current_active_step
          .removeClass("active")
          .prev()
          .removeClass("activated")
          .addClass("active");
        // progress bar
        bar_progress(progress_line, "left");
        // show previous step
        $(this).prev().fadeIn();
        // scroll window to beginning of the form
        scroll_to_class($(".f1"), 20);
      });
  });

  // submit
  $(".f1").on("submit", function (e) {
    // fields validation
    $(this)
      .find('input[type="text"], input[type="password"], textarea')
      .each(function () {
        if ($(this).val() == "") {
          e.preventDefault();
          $(this).addClass("input-error");
        } else {
          $(this).removeClass("input-error");
        }
      });
    // fields validation
  });
});

$(document).ready(function () {
  $('input[type="text"], input[type="password"], textarea').each(function () {
    $(this).val($(this).attr("placeholder"));
  });
});

// API

const comentarioAPI = document.querySelector("#comentarioAPI");

const comentarios = fetch("https://dummyjson.com/comments?limit=9");

comentarios
  .then((res) => res.json())
  .then((data) => {
    console.log(data.comments);

    for (const elemento of data.comments) {
      // itero el array data con un for of que crea
      // un objeto temporal de nombre elemento
      console.log(data);
      const nuevoDiv = document.createElement("div"); //creo un nuevo div para contener el resto del codigo
      nuevoDiv.setAttribute("class", "col");
      nuevoDiv.innerHTML = ` 
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${elemento.user.username}</h5>
         <p class="card-text">
           "${elemento.body}"
          </p>
        </div>
      </div> `;
      comentarioAPI.appendChild(nuevoDiv); //inserto el nuevo div con todos los datos extraidos del array
    }
  });
