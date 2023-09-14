import { useState } from 'react';
import { Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface CardProps {
  title: string;
  url: string;
  description: string;
}

export const Item = ({ title, url, description }: CardProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${url}` }}
        alt={title}
        style={styles.img}
        resizeMode="contain"
      />
      <Text style={styles.txt}>{title}</Text>
      <TouchableOpacity
        style={styles.btn}
        activeOpacity={0.5}
        onPress={() => setIsVisible(true)}
      >
        <Text style={styles.txtBtn}>Ver mais</Text>
      </TouchableOpacity>
      {isVisible && (
        <Modal style={styles.modal} animationType="slide">
          <View style={styles.content}>
            <Text style={styles.txtCntt}>{title}</Text>

            <Text style={styles.snps}>Sinopse:</Text>
            <Text style={styles.description}>Sinopse:{description}</Text>
            <Pressable
              style={styles.btn2}
              onPress={() => {
                setIsVisible(false);
              }}
            >
              <Text style={styles.txtBtn}>Fechar</Text>
            </Pressable>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,

    padding: 16,

    gap: 16,
  },
  img: {
    width: '100%',
    height: 350,
  },
  txt: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 16,
  },
  btn: {
    alignSelf: 'flex-end',
    backgroundColor: '#222',
    padding: 16,
    borderRadius: 6,
  },
  btn2: {
    width: '100%',

    alignItems: 'center',

    backgroundColor: '#222',

    padding: 16,
    borderRadius: 6,
  },
  txtBtn: {
    color: '#fff',
  },
  modal: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 24,
  },
  description: {
    fontSize: 24,
    textAlign: 'justify',
  },
  snps: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  txtCntt: {
    fontSize: 32,
    fontWeight: 'bold',
    backgroundColor: '#222',
    color: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 32,
  },
});

