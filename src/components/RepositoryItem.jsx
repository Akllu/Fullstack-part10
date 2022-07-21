import { View, StyleSheet, Image, Pressable } from 'react-native';
import * as Linking from 'expo-linking';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },
  authorContainer: {
    justifyContent: 'center',
    padding: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  infoContainer: {
    flexDirection: 'row',
  },
  infoItemContainer: {
    justifyContent: 'center',
    marginLeft: 5,
    width: '80%',
  },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 10,
  },
  countItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    marginTop: 5,
    width: '90%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
  },
});

const InfoItem = ({ fullName, description, language }) => {
  const languageTagStyles = StyleSheet.create({
    header: {
      marginTop: 20,
    },
    description: {
      marginTop: 5,
    },
    language: {
      backgroundColor: theme.colors.primary,
      alignSelf: 'flex-start',
      color: '#ffffff',
      borderRadius: 3,
      padding: 5,
      marginTop: 10,
    },
  });

  return (
    <View style={styles.infoItemContainer}>
        <Text style={languageTagStyles.header} fontWeight={'bold'} fontSize={'subheading'}>{fullName}</Text>
        <Text style={languageTagStyles.description} color={'textSecondary'} >{description}</Text>
        <Text style={languageTagStyles.language} >{language}</Text>
    </View>
  );
};

const AuthorItem = ({ avatarUrl }) => {
  return (
    <View style={styles.authorContainer}>
      <Image style={styles.avatar} source={{ uri: avatarUrl }} />
    </View>
  );
};

const CountItem = ({ count, name}) => {
  if (count >= 1000) {
    count = `${(count / 1000).toFixed(1)}k`;
  }

  return (
    <View style={styles.countItemContainer}>
      <Text fontWeight={'bold'} >{count}</Text>
      <Text color={'textSecondary'} >{name}</Text>
    </View>
  );
};

const RepositoryItem = ({ item, showSingle }) => {
  return (
    <View style={styles.container} testID="repositoryItem">
      <View style={styles.infoContainer}>
        <AuthorItem avatarUrl={item.ownerAvatarUrl} />
        <InfoItem fullName={item.fullName} description={item.description} language={item.language} />
      </View>
      <View style={styles.countContainer}>
        <CountItem count={item.stargazersCount} name={'Stars'} />
        <CountItem count={item.forksCount} name={'Forks'} />
        <CountItem count={item.reviewCount} name={'Reviews'} />
        <CountItem count={item.ratingAverage} name={'Rating'} />
      </View>
      {showSingle && (
        <Pressable style={styles.button} onPress={() => Linking.openURL(item.url)}>
          <Text style={styles.buttonText} fontWeight={'bold'}>Open in GitHub</Text>
        </Pressable>
      )}
    </View>
  );
};

export default RepositoryItem