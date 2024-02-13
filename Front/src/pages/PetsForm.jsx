import React from 'react';
import TextInput from '../components/TextInput';

function PetsForm() {
  return (
    <main>
      <section>
        <form>
          <label className="bg-[#ababab]">Image</label>
          <input type="text" />
          <TextInput labelName={'Name'} />
          <TextInput labelName={'Age'} />
          <TextInput labelName={'Adress'} />
          <TextInput labelName={'Description'} />
        </form>
      </section>
    </main>
  );
}

export default PetsForm;
