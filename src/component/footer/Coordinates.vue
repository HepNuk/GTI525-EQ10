<template>
  <MyTable 
    :header="header"
    :data="studentMembers"
  />
</template>

<script>
export default {
  computed: {
    header() {
      return [
        'First Name',
        'Last Name',
        'Email',
        'Permanent Code',
      ];
    },

    studentMembers() {
      return [
        {
          firstName: 'Nick-Karl',
          lastName: 'Chao',
          email: 'nick-karl.chao.1@ens.etsmtl.ca',
          code: 'CHAN91090005',
        },
        {
          firstName: 'Jimmy',
          lastName: 'Mai',
          email: 'jimmy.mai.1@ens.etsmtl.ca',
          code: 'MAIJ09079505'
        },
        {
          firstName: 'Ai-Vi',
          lastName: 'Nguyen',
          email: 'ai-vi.nguyen.1@ens.etsmtl.ca',
          code: 'NGUA16569307'
        },
        {
          firstName: 'Nikola',
          lastName: 'Perotic',
          email: 'nikola.perotic.1@ens.etsmtl.ca',
          code: 'PERN06049400'
        }
      ];
    }
  }
};

</script>

<style lang="scss" scoped>
table{
  width: 100%;

  th {
    background: #ddd;
  }

  td, th { 
    text-align: center;
  }

  margin: 0;
}
</style>