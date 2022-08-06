import { User, Pet } from "../models";
import { cloudinary } from "../lib/cloudinary";
import { index } from "../lib/algolia";

export async function createPet(userId, petData) {
  const imagen = await cloudinary.uploader.upload(petData.pictureURL, {
    resource_type: "image",
    discard_original_filename: true,
    width: 200,
  });

  const pet = await Pet.create({
    petName: petData.petName,
    description: petData.description,
    lat: petData.lat,
    lng: petData.lng,
    pictureURL: imagen.secure_url,
    userId: userId,
    ubication: petData.ubication,
    email: petData.email,
  });
  try {
    const algoliaRes = await index.saveObject({
      petName: pet.get("petName"),
      objectID: pet.get("id"),
      description: pet.get("description"),
      pictureURL: pet.get("pictureURL"),
      ubication: pet.get("ubication"),
      email: pet.get("email"),
      _geoloc: {
        lat: pet.get("lat"),
        lng: pet.get("lng"),
      },
    });
  } catch (error) {
    console.error(error);
  }
  return pet;
}

export async function getAllPets() {
  const pets = await Pet.findAll();
  return pets;
}

export async function getPetsNear(geoLoc) {
  const loc = geoLoc;
  const geoParams = loc.lat + "," + loc.lng;
  const algoliaGeoLoc = await index.search("", {
    aroundLatLng: geoParams,
    aroundRadius: 5000,
  });

  return algoliaGeoLoc.hits;
}

export async function deletePet(petId) {
  await Pet.destroy({
    where: { id: petId },
  });
  const idString = petId.toString();
  await index.deleteObject(idString);
  return true;
}

function bodyToIndex(petData, id?) {
  const respuesta: any = {};
  if (petData.petName) {
    respuesta.petName = petData.petName;
  }
  if (petData.description) {
    respuesta.description = petData.description;
  }
  if (petData.ubication) {
    respuesta.ubication = petData.ubication;
  }
  if (petData.pictureURL) {
    respuesta.pictureURL = petData.pictureURL;
  }
  if (petData.lat && petData.lng) {
    respuesta._geoloc = {
      lat: petData.lat,
      lng: petData.lng,
    };
  }
  if (id) {
    respuesta.objectID = id;
  }
  console.log(respuesta, "respuesta");

  return respuesta;
}

export async function petUpdateData(petData, id) {
  try {
    if (petData.pictureURL) {
      const imagen = await cloudinary.uploader.upload(petData.pictureURL, {
        resource_type: "image",
        discard_original_filename: true,
        width: 200,
      });
      petData.pictureURL = imagen.secure_url;

      const pet = await Pet.update(petData, {
        where: {
          id: id,
        },
      });
      const algoliaRes = await index.partialUpdateObject(
        bodyToIndex(petData, id)
      );
      return pet;
    } else {
      const pet = await Pet.update(petData, {
        where: {
          id: id,
        },
      });
      const algoliaRes = await index.partialUpdateObject(
        bodyToIndex(petData, id)
      );
      return pet;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getPetById(petId) {
  const pet = await Pet.findByPk(petId);
  return pet;
}

export async function getMyPets(id) {
  const pet = await Pet.findAll({
    where: {
      userId: id,
    },
  });
  return pet;
}
