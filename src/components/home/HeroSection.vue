<template>

<section class="hero">
  <div class="container">
    <div class="row min-vh-100 align-items-center">
      <div class="col-lg-6">
        <h1 class="display-3 fw-bold mb-4">
          Muebles y cocinas a tu medida
        </h1>
        <p class="lead mb-4">
          Diseño, calidad y montaje profesional
          para transformar tu hogar.
        </p>
        <div class="d-flex gap-3 flex-wrap">
          <router-link
            to="/productos"
            class="btn btn-primary btn-lg"
          >
            Ver catálogo
          </router-link>
          <router-link
            to="/contacto"
            class="btn btn-outline-light btn-lg"
          >
            Contactar
          </router-link>
        </div>
      </div>
    </div>
  </div>
</section>

</template>

<style scoped>

.hero{
  background-image:
    linear-gradient(
      rgba(0,0,0,0.55),
      rgba(0,0,0,0.55)
    ),
    url('/hero-kitchen_700.jpg');
    background-size: 80%;
    background-repeat: no-repeat;
  /*background-size: cover;*/
  background-position: center;
  color:white;
}

@media (max-width:768px){
  .hero h1{
    font-size:2.5rem;
  }
}

</style>