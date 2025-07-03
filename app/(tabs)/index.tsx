import React, { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type Account = {
  id: string;
  name: string;
  balance: number;
};

export default function BankingApp() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [name, setName] = useState('');
  const [balance, setBalance] = useState('');

  const addAccount = () => {
    if (name.trim() && balance.trim() && !isNaN(Number(balance))) {
      setAccounts([
        ...accounts,
        { id: Date.now().toString(), name, balance: Number(balance) },
      ]);
      setName('');
      setBalance('');
      // tutaj możesz wywołać logowanie eventu do Firebase Analytics
    }
  };

  const removeAccount = (id: string) => {
    setAccounts(accounts.filter(acc => acc.id !== id));
    // tutaj możesz wywołać logowanie eventu do Firebase Analytics
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bank Accounts</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Account name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Balance"
          value={balance}
          onChangeText={setBalance}
          keyboardType="numeric"
        />
        <Button title="Add" onPress={addAccount} />
      </View>
      <FlatList
        data={accounts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.accountContainer}>
            <View>
              <Text style={styles.accountName}>{item.name}</Text>
              <Text style={styles.accountBalance}>Balance: {item.balance} PLN</Text>
            </View>
            <TouchableOpacity onPress={() => removeAccount(item.id)}>
              <Text style={styles.remove}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No accounts yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  accountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  accountName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  accountBalance: {
    fontSize: 14,
    color: '#555',
  },
  remove: {
    color: 'red',
  },
  empty: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  },
});
