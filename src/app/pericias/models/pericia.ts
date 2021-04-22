export interface Pericia {
    estado:     boolean;
    codigo:     string;
    mensaje:    string;
    campoError: null;
    archivo:    Archivo;
}

export interface Archivo {
    nombre:       string;
    encodeBase64: string;
}
