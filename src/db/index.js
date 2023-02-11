import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("prueba.db");
export const addMainItem = (color, text) => {
    if (text === null || text === "" || text.includes(" ") || text === 'lista_compra') {
        alert("Error en el nombre introducido (no puede contener espacios)");
        return false;
    };
    db.transaction(
        tx => {
            tx.executeSql("INSERT INTO lista_compra (color,value) VALUES (?,?)", [color, text]);
        },
        null,
        () => alert("Added succesfully"),
        error => alert(error)
    );
};
export const deleteItem = (table, id) => {
    db.transaction(
        tx => {
            tx.executeSql(`DELETE FROM ${table} where id = ?;`, [id])
        },
        null,
        () => alert("Deleted succesfully"),
        error => alert(error)
    );
};
export const addItem = (table, text) => {
    if (text === null || text === "") {
        alert("Error en el nombre introducido (no puede contener espacios)");
        return false;
    };
    db.transaction(
        tx => {
            tx.executeSql(`INSERT INTO ${table} (done, value) values (?, ?)`, [0, text]);
        },
        null,
        () => alert("Added succesfully"),
        error => console.error(error)
    );
};
export const setItemsUndone = (table) => {
    db.transaction(
        tx => {
            tx.executeSql(`update ${table} set done = 0;`);
        },
        null
    );
};
export const setItemDone = (table, id, done) => {
    db.transaction(
        (tx) => { tx.executeSql(`update ${table} set done = ? where id = ?;`, [done, id]) },
        null
    );
};
export const deleteAllItems = (table) => {
    db.transaction(
        tx => {
            tx.executeSql(`DELETE FROM ${table};`, [])
        },
        null,
        () => alert("Deleted succesfully"),
        error => alert(error)
    );
};