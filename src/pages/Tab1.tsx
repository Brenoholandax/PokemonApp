import React, { useEffect, useState } from "react";

import {
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { IonCard, IonCardContent } from "@ionic/react";

import {
  IonInput,
  IonItem,
  IonList,
  IonLabel,
  IonButton,
  IonTextarea,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { logoIonic } from "ionicons/icons";
import { star } from "ionicons/icons";
import "./Tab1.css";

import PokemonApi from "../server/PokemonApi";

const api = new PokemonApi();
const Tab1: React.FC = () => {
  const [busca, setBusca] = useState<string | null | undefined>("");
  const [nomePokemon, setNomePokemon] = useState<string | null | undefined>(
    "Titulo",
  );
  const [imagemPokemon, setImagemPokemon] = useState<string | null | undefined>(
    "",
  );
  const [pesoPokemon, setPesoPokemon] = useState<string | null | undefined>("");
  const [alturaPokemon, setAlturaPokemon] = useState<string | null | undefined>(
    "",
  );
  const [numeroPokemon, setNumeroPokemon] = useState<string | null | undefined>(
    "",
  );

  const [habildadesPokemon, setHabilidadesPokemon] = useState<object[]>([{}]);

  function buscarPokemon() {
    var promessa = api.buscarPokemonIdOuNome(busca?.toLowerCase());

    promessa
      .then((res) => {
        if (!res.ok) {
          return null;
        } else {
          return res.json();
        }
      })
      .then((dados) => {
        console.log(dados);
        if (dados == null) {
        } else {
          setNomePokemon(dados.name[0].toUpperCase() + dados.name.substring(1));
          setImagemPokemon(
            dados.sprites.other["official-artwork"].front_default,
          );
          setPesoPokemon(dados.weight);
          setAlturaPokemon(dados.height);
          setNumeroPokemon(dados.id);
          var habilidades: object[] = [];
          for (let i = 0; i <= dados.abilities.length - 1; i++) {
            habilidades.push({ name: dados.abilities[i].ability.name });
          }
          console.log(habilidades);
          setHabilidadesPokemon(habilidades);
        }
      });
  }
  function buscarPokemonRandom() {
    var promessa = api.buscarPokemonRandom();
    promessa
      .then((res) => {
        if (!res.ok) {
          return null;
        } else {
          return res.json();
        }
      })
      .then((dados) => {
        console.log(dados);
        if (dados == null) {
        } else {
          setNomePokemon(dados.name[0].toUpperCase() + dados.name.substring(1));
          setImagemPokemon(
            dados.sprites.other["official-artwork"].front_default,
          );
          setPesoPokemon(dados.weight);
          setAlturaPokemon(dados.height);
          setNumeroPokemon(dados.id);
          var habilidades: object[] = [];
          for (let i = 0; i <= dados.abilities.length - 1; i++) {
            habilidades.push({ name: dados.abilities[i].ability.name });
          }
          console.log(habilidades);
          setHabilidadesPokemon(habilidades);
        }
      });
  }
  useEffect(() => {
    buscarPokemonRandom();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Buscar Pokémon</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard>
          <IonCardContent>
            <IonList>
              <IonItem>
                <IonLabel position="stacked">Nome ou Id</IonLabel>
                <IonInput
                  onIonChange={(e) => {
                    setBusca(e.detail.value);
                  }}
                  placeholder=""
                  maxlength={25}
                  value={busca}
                ></IonInput>
              </IonItem>
            </IonList>
            <IonButton onClick={buscarPokemon}>Pesquisar</IonButton>
            {/*<IonTextarea placeholder="Valores" readonly={true}></IonTextarea>*/}
          </IonCardContent>
        </IonCard>
        <IonCard>
          {imagemPokemon && (
            <img className="imagemPokemon" src={imagemPokemon} />
          )}
          <IonCardHeader>
            <IonCardTitle>{nomePokemon}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol>Altura: {alturaPokemon}</IonCol>
                <IonCol>Peso: {pesoPokemon}</IonCol>
                <IonCol>Número: {numeroPokemon}</IonCol>
              </IonRow>
            </IonGrid>
            <h1 style={{ color: "#ccc", marginTop: "3%", fontWeight: "bold" }}>
              Habilidades
            </h1>
            {habildadesPokemon.map((hab, i) => {
              var nome: string = "" + (hab as any).name;
              nome = (nome[0].toUpperCase() + nome.substring(1)).replace(
                "-",
                " ",
              );
              return (
                <IonItem>
                  <IonLabel>{nome}</IonLabel>
                </IonItem>
              );
            })}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
