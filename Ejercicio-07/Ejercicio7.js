"use strict";

class Interactuar {

    mostrarParrafos() {
        $("p").show();
    }

    ocultarParrafos() {
        $("p").hide();
    }

    mostrarJugador() {
        $("#nombre").text("Alfredo Di Stéfano");
        $("#titulo").text("El mejor jugador de la historia del fútbol");
        $("#apodo").text("La Saeta Rubia");
        $("#biografia").text("Alfredo Stéfano Di Stéfano Laulhén. (Buenos Aires, Argentina; 4 de julio de 1926-Madrid, España; 7 de julio de 2014), más conocido como Alfredo Di Stéfano, fue un futbolista y entrenador argentino nacionalizado español. Jugador legendario de los clubes River Plate, Millonarios y Real Madrid Club de Fútbol, desde 2000 hasta su fallecimiento fue presidente de honor de este último, al que como jugador debe sus mayores éxitos y reconocimientos mundiales y del que llegó a ser su máximo goleador histórico. Es considerado como uno de los mejores jugadores de todos los tiempos.");
        $("#reconocimientos").text("Como jugador fue internacional por dos países, circunstancia permitida en la época, contabilizando seis encuentros con la selección argentina y treinta y uno con la selección española tras adoptar su nacionalidad en 1956. Pese a ello, se da la circunstancia de que nunca disputó una Copa Mundial - el torneo más prestigioso a nivel de selecciones - por diferentes motivos, lo cual no ha sido impedimento para que sea considerado uno de los mejores jugadores de la historia del fútbol y como el primer grande de este deporte. Su mayor logro con una selección fue el Campeonato Sudamericano 1947, actual Copa América.");
    }

    mostrarJugadora() { 
        $("#nombre").text("Megan Anna Rapinoe");
        $("#titulo").text("La mejor jugadora de la historia del fútbol");
        $("#apodo").text("Pinoe");
        $("#biografia").text("Megan Anna Rapinoe (Redding, California, 5 de julio de 1985), también conocida como Pinoe, es una futbolista profesional estadounidense que juega como centrocampista o extremo en el OL Reign de la National Women's Soccer League. Como miembro de la selección femenina de fútbol de los Estados Unidos, ayudó a ganar la Copa Mundial Femenina de Fútbol de 2015, los Juegos Olímpicos de 2012 y la medalla de plata en la Copa Mundial Femenina de Fútbol de 2011. En el Mundial de 2019 ganó el oro con el equipo y además fue Balón de Oro, Bota de Oro y MVP en tres partidos de la competición, incluida la final. El 23 de septiembre de 2019 fue elegida la Mejor Jugadora de 2019 por la FIFA y recibió el Balón de Oro Femenino anual.");
        $("#reconocimientos").text("Rapinoe es conocida internacionalmente por su elaborador y técnico estilo de juego, y por su preciso pase a Abby Wambach en el minuto 122 de los cuartos de final de la Copa Mundial Femenina de Fútbol de 2011 contra Brasil, que acabó en gol e igualó el marcador, posteriormente Estados Unidos ganaría el partido en la tanda de penales. Durante los Juegos Olímpicos de 2012 marcó tres goles y fue la máxima asistente del equipo con cuatro asistencias consiguiendo la medalla de oro para Estados Unidos.");
    }

}

let i = new Interactuar();