new Vue({
    el: '#app',
    data: {
        entrenadores: [],
        seleccionados: [],
        mensajeCombate: '',
        totalEntrenadores: 0,
        detallesCombate: null
    },
    computed: {
        puedeCombatir() {
            return this.seleccionados.length === 2;
        }
    },
    methods: {
        verPokemons(entrenador) {
            this.entrenadores.forEach(e => {
                if (e !== entrenador) {
                    e.mostrarPokemons = false;
                }
            });
            entrenador.mostrarPokemons = !entrenador.mostrarPokemons;
        },
        seleccionarEntrenador(entrenador) {
            if (this.seleccionados.includes(entrenador)) {
                this.seleccionados = this.seleccionados.filter(e => e !== entrenador);
            } else if (this.seleccionados.length < 2) {
                this.seleccionados.push(entrenador);
            }
            if (this.puedeCombatir) {
                this.actualizarDetallesCombate();
                this.irACombate();
            } else {
                this.detallesCombate = null;
                this.mensajeCombate = ''; // Limpiamos el mensaje de combate cuando no hay dos seleccionados
            }
        },
        actualizarDetallesCombate() {
            if (this.seleccionados.length === 2) {
                const entrenador1 = this.seleccionados[0];
                const entrenador2 = this.seleccionados[1];
                this.detallesCombate = {
                    entrenador1: entrenador1,
                    entrenador2: entrenador2
                };
            } else {
                this.detallesCombate = null;
            }
        },
        nuevoCombate() {
            if (this.puedeCombatir) {
                const entrenador1 = this.seleccionados[0].entrenador;
                const entrenador2 = this.seleccionados[1].entrenador;
                this.mensajeCombate = `Se realizará un nuevo combate entre ${entrenador1} vs ${entrenador2}`;
            }
        },
        cargarDatos() {
            fetch('./json/pokemon.json')
                .then(response => response.json())
                .then(data => {
                    this.entrenadores = data.map(entrenador => ({
                        ...entrenador,
                        mostrarPokemons: false
                    }));
                    this.totalEntrenadores = this.entrenadores.length;
                });
        },
        irACombate() {
            if (this.puedeCombatir) {
                // Función para desplazarse hacia la sección de detalles del combate
                const combateSection = document.getElementById('detalles-combate');
                if (combateSection) {
                    combateSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        }
    },
    created() {
        this.cargarDatos();
    }
});
