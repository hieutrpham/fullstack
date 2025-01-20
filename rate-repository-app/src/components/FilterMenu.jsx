import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Menu } from "react-native-paper";

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
  },
  container: {
    display: "flex",
  },
});

const FilterMenu = ({ refetch }) => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const filterLatest = () => {
    refetch({
      orderBy: "CREATED_AT",
      orderDirection: "DESC",
    });
  };

  const filterHighestRated = () => {
    refetch({
      orderBy: "RATING_AVERAGE",
      orderDirection: "DESC",
    });
  };

  const filterLowestRated = () => {
    refetch({
      orderBy: "RATING_AVERAGE",
      orderDirection: "ASC",
    });
  };

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Button onPress={openMenu}>Change listed repositories order</Button>
        }
        style={styles.menu}
      >
        <Menu.Item onPress={filterLatest} title="Latest repositories" />
        <Menu.Item
          onPress={filterHighestRated}
          title="Highest rated repositories"
        />
        <Menu.Item
          onPress={filterLowestRated}
          title="Lowest rated repositories"
        />
      </Menu>
    </View>
  );
};

export default FilterMenu;
