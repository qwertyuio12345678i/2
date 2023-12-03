import { defer } from "react-router-dom";

const serverUrl = "http://localhost:5001";

export class Api {
  static async setUser({ user }) {
    return await set("users", user);
  }

  static async getNotes({ id }) {
    // const notes = await get(`notes?authorId=${id}`);
    // if (!notes) {
    //   return [];
    // } else return await notes;
    return await get(`notes?authorId=${id}`);
  }

  static async getNote({ id }) {
    return await get(`notes/${id}`);
  }

  static async setNote({ note }) {
    return await set(`notes`, note);
  }

  static async deleteNote({ id }) {
    return await delElem(`notes/${id}`);
  }

  static async updateNote({ newNote, id }) {
    return await update(`notes/${id}`, newNote);
  }
}

const get = async (url) => {
  const response = await fetch(`${serverUrl}/${url}`);
  if (!response.ok) {
    console.log("response not ok 404");
    throw new Response("", { status: 404 });
  }

  const obj = await response.json();
  return obj;
};

const set = async (url, obj) => {
  const response = await fetch(`${serverUrl}/${url}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj),
  });

  if (!response.ok) {
    console.log("response not ok 404");
    throw new Response("", { status: 404 });
  }

  console.log("added");
};

const update = async (url, obj) => {
  const response = await fetch(`${serverUrl}/${url}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj),
  });

  if (!response.ok) {
    console.log("response not ok 404");
    throw new Error(`Failed to update item. Status: ${response.status}`);
  }

  console.log("added");
};

const delElem = async (url) => {
  const response = await fetch(`${serverUrl}/${url}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    console.log("response not ok 404");
    throw new Error(`Failed to update item. Status: ${response.status}`);
  }

  console.log("added");
};

/*
OLD loadObject

// static async getUsers() {
  //   return await get('users');
  // }
  // static async getAlbums() {
  //   return await get('albums');
  // }
  // static async getUser({ id }) {
  //   return await get(`users/${id}`);
  // }
  // static async getUserAlbums(filters) {
  //   const query = new URLSearchParams(filters).toString();
  //   console.log(serverUrl + `albums?${query}`);
  //   return await get(`albums?${query}`);
  // }
  // static async getAlbum({ id }) {
  //   return await get(`albums/${id}`);
  // }
  // static getPhotos(filters) {
  //   const query = new URLSearchParams(filters).toString();
  //   console.log(serverUrl + `photos?${query}`);
  //   return get(`photos?${query}`);
  // }

*/
