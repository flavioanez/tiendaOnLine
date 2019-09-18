export function getNameRank(idrank) {

    switch (idrank) {
        case 1:
            return 'Ejecutivo';
            break;
        case 2:
            return 'Experimentado';
            break;
        case 3:
            return 'Senior';
            break;
        case 4:
            return 'Bronce';
            break;
        case 5:
            return 'Plata';
            break;
        case 6:
            return 'Oro';
            break;
        case 7:
            return 'Rubi';
            break;
        case 8:
            return 'Esmeralda';
            break;
        case 9:
            return 'Diamante';
            break;
        case 10:
            return 'Doble Diamante';
            break;
        case 11:
            return 'Vicepresidente';
            break;
        case 12:
            return 'Presidente';
            break;
        default:
            return 'Sin rango';
    }
}

export function getPointsRank(idrank) {

    switch (idrank) {
        case 1:
            return 360;
            break;
        case 2:
            return 720;
            break;
        case 3:
            return 1500;
            break;
        case 4:
            return 3000;
            break;
        case 5:
            return 6000;
            break;
        case 6:
            return 12000;
            break;
        case 7:
            return 30000;
            break;
        case 8:
            return 60000;
            break;
        case 9:
            return 120000;
            break;
        case 10:
            return 250000;
            break;
        case 11:
            return 500000;
            break;
        case 12:
            return 1000000;
            break;
        default:
            return 'Sin rango';
    }
}
