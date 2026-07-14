<template>

<section class="container py-5">

  <h2 class="text-center mb-5">
    Nuestras secciones
  </h2>

  <div class="row g-4">

    <div class="col-md-4">

      <div class="card h-100 shadow-sm">

        <img
          src="/muebles.jpg"
          class="card-img-top"
          alt="Muebles"
        >

        <div class="card-body">

          <h5 class="card-title">
            Muebles
          </h5>

          <p class="card-text">
            Salones, dormitorios y mobiliario
            para toda la casa.
          </p>

          <router-link
            to="/muebles"
            class="btn btn-primary"
          >
            Ver más
          </router-link>

        </div>

      </div>

    </div>

    <div class="col-md-4">

      <div class="card h-100 shadow-sm">

        <img
          src="/cocinas.jpg"
          class="card-img-top"
          alt="Cocinas"
        >

        <div class="card-body">

          <h5 class="card-title">
            Cocinas
          </h5>

          <p class="card-text">
            Diseños modernos y personalizados.
          </p>

          <router-link
            to="/cocinas"
            class="btn btn-primary"
          >
            Ver más
          </router-link>

        </div>

      </div>

    </div>

    <div class="col-md-4">

      <div class="card h-100 shadow-sm">

        <img
          src="/electrodomesticos.jpg"
          class="card-img-top"
          alt="Electrodomésticos"
        >

        <div class="card-body">

          <h5 class="card-title">
            Electrodomésticos
          </h5>

          <p class="card-text">
            Las mejores marcas para tu hogar.
          </p>

          <router-link
            to="/electrodomesticos"
            class="btn btn-primary"
          >
            Ver más
          </router-link>

        </div>

      </div>

    </div>

  </div>

</section>

</template>