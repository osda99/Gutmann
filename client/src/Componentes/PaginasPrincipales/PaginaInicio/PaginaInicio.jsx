import React, { useContext, useState } from 'react';
import { Redirect } from "react-router";
import { EstadoGlobal } from "../../../EstadoGlobal";
import "./carrusel.css"

import "./PaginaInicio.css";
import Mapa from "../../../img/Index/Mapa.jpg";

const PaginaInicio = () => {
	const estado = useContext(EstadoGlobal);
	const [categorias] = estado.categoriasAPI.categorias;
	const setCategoria = estado.productosAPI.categoria[1];
	const [redireccion, setRedireccion] = useState(false);

	const navegacionTienda = (nombreCategoria) => {
		setCategoria(nombreCategoria);
		setRedireccion(true);
	};

	const boxes = document.querySelectorAll(".box");
	let activeIndex = 1;
	let isTransitioning = false;

	function updateCurrentImg() {
		isTransitioning = true;

		boxes.forEach((box, index) => {
			const isActive = index === activeIndex;
			box.classList.toggle("expanded", isActive);
			box.classList.toggle("closed", !isActive);
		});

		setTimeout(() => {
			isTransitioning = false;
		}, 500);
	}

	function handleArrowKey(event) {
		if (isTransitioning) {
			return;
		}

		if (event.key === "ArrowRight") {
			activeIndex = (activeIndex + 1) % boxes.length;
		} else if (event.key === "ArrowLeft") {
			activeIndex = (activeIndex - 1 + boxes.length) % boxes.length;
		}

		updateCurrentImg();
	}

	function handleBoxClick(index) {
		if (isTransitioning) {
			return;
		}

		if (index === activeIndex && boxes[index].classList.contains("expanded")) {
			boxes.forEach((box) => box.classList.remove("closed", "expanded"));
			activeIndex = 0;
		} else {
			activeIndex = index;
			updateCurrentImg();
		}
	}

	document.addEventListener("keydown", handleArrowKey);

	updateCurrentImg();

	boxes.forEach((box, index) => {
		box.addEventListener("click", () => handleBoxClick(index));
	});


	return (
		<>
			{redireccion && <Redirect to="/tienda" />}

			<header className="hero seccion tamano-completo">
				<div className="titulo-hero">
					<h1 data-transicion style={{ animationDelay: "0s" }}>Gut Mann</h1>
					<h2 data-transicion style={{ animationDelay: "0.1s" }}>Panadería y Confitería</h2>
				</div>
				<div data-transicion style={{ animationDelay: "0.55s" }} className="informacion-hero">
					<h3>Mirá lo que tenemos para ti</h3>
					<i className="fas fa-chevron-down"></i>
				</div>
			</header>

			<div className="seccion nuestros-productos">
				<h2 data-transicion style={{ animationDelay: "0s" }}>Nuestros Productos</h2>

				<div className="box-container">
					<div className="box">
						<div className="overlay"></div>
					</div>
					<div className="box">
						<div className="overlay"></div>
					</div>
					<div className="box">
						<div className="overlay"></div>
					</div>
					<div className="box">
						<div className="overlay"></div>
					</div>
					<div className="box">
						<div className="overlay"></div>
					</div>
					<div className="box">
						<div className="overlay"></div>
					</div>
					<div className="box">
						<div className="overlay"></div>
					</div>
				</div>

				<div className="categorias-productos" data-transicion style={{ animationDelay: "0.3s" }}>
					{
						categorias.map(categoria => {
							return (
								<div className="categoria" key={categoria._id} onClick={() => navegacionTienda(categoria.nombre)}>
									<span>{categoria.esFemenino ? "Nuestras" : "Nuestros"}</span>
									<h4>{categoria.nombre}</h4>
									<img src={"/imagenes/categorias/" + categoria.imagenPortada} alt="" className="no-select" />
								</div>
							);
						})
					}
				</div>
			</div>

			<div className="donde-encontrarnos seccion tamano-completo">
				<div className="contenido-donde-encontrarnos">
					<h2 data-transicion style={{ animationDelay: "0.2s" }}>¿Sabés dónde encontranos?</h2>
					<div className="informacion" data-transicion style={{ animationDelay: "0.4s" }}>
						<i className="fas fa-map-marker-alt"></i>
						<p>Guadalupe - Huila</p>
					</div>
					<div className="informacion" data-transicion style={{ animationDelay: "0.5s" }}>
						<i className="far fa-clock"></i>
						<p>Lunes a Viernes <span>08:00 — 19:30</span></p>
					</div>
					
				</div>
			</div>
		</>
	);
};

export default PaginaInicio;
