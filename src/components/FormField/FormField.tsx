import { Controller, FieldValues, Path } from 'react-hook-form';
import { FormFieldInterface } from '../../types/componentsTypes/FormFieldInterfaces';
import { TextInput, View, StyleSheet, Text } from 'react-native';
import { COLORS } from '../../const/colors';

const FormField = <T extends FieldValues>({
  field,
  control,
  // getValues,
  // trigger,
}: FormFieldInterface<T>) => {
  return (
    <View>
      <Controller
        control={control}
        name={field.id as Path<T>}
        rules={{ required: field.isRequired }}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <View style={styles.inputBlock}>
            {field.label && <Text>{field.label}</Text>}
            <TextInput
              placeholder={field.placeholder}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              style={styles.input}
            />
            {error && (
              <Text style={styles.errorText}>Это поле обязательно</Text>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default FormField;

const styles = StyleSheet.create({
  errorText: {
    color: COLORS.error,
  },
  input: {
    borderWidth: 1,
    marginBottom: 4,
    padding: 10,
  },
  inputBlock: { marginBottom: 10 },
});
