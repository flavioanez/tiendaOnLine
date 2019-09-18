// export const apiUrl = 'https://api.allinapp.com.co/api/';
export const apiUrl = 'http://localhost:4077/api/';
export const defaultSocket = 'http://localhost:4077';

export const formatNumber: any = {
    separador: '.', // separador para los miles
    sepDecimal: ',', // separador para los decimales
    formatear: function (num) {
        num += '';
        const splitStr = num.split('.');
        let splitLeft = splitStr[0];
        const splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
        const regx = /(\d+)(\d{3})/;
        while (regx.test(splitLeft)) {
            splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
        }
        return this.simbol + splitLeft + splitRight;
    },
    new: function (numero: number, simbol) {
        this.simbol = simbol || '';
        return this.formatear(numero);
    }

};
