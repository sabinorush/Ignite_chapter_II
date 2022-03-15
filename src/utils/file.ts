import fs from "fs";

export const deleteFile = async(filename: string) => {

  try {
    await fs.promises.stat(filename); //verifica se o arquiva existe com stat
  } catch {
    return;
  }
  fs.promises.unlink(filename); // Remove o arquivo caso ele já exista.
};