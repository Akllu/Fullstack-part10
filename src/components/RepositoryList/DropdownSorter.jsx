import { Picker } from '@react-native-picker/picker';

const DropdownSorter = ({ style, sortOption, setSortOption }) => {
  const sortOptions = [
    { label: 'Latest repositories', value: 'CREATED_AT' },
    { label: 'Highest rated repositories', value: 'RATING_AVERAGE_DESC' },
    { label: 'Lowest rated repositories', value: 'RATING_AVERAGE_ASC' }
  ];

  return (
    <Picker
      style={style}
      selectedValue={sortOption}
      onValueChange={itemValue => setSortOption(itemValue)}
      prompt='Select an item...'
    >
      {sortOptions.map(option => {
        return <Picker.Item label={option.label} value={option.value} key={option.value} />
      })}
    </Picker>
  );
};

export default DropdownSorter;