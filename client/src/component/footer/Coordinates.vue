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
        'Prénom',
        'Nom de famille',
        'Courielle',
        'Code Permanent',
        'Groupe',
      ];
    },

    studentMembers() {
      return [
        {
          firstName: 'Nick-Karl',
          lastName: 'Chao',
          email: 'nick-karl.chao.1@ens.etsmtl.ca',
          code: 'CHAN91090005',
          groupe: '10',
        },
        {
          firstName: 'Jimmy',
          lastName: 'Mai',
          email: 'jimmy.mai.1@ens.etsmtl.ca',
          code: 'MAIJ09079505',
          groupe: '10',

        },
        {
          firstName: 'Ai-Vi',
          lastName: 'Nguyen',
          email: 'ai-vi.nguyen.1@ens.etsmtl.ca',
          code: 'NGUA16569307',
          groupe: '10',

        },
        {
          firstName: 'Nikola',
          lastName: 'Perotic',
          email: 'nikola.perotic.1@ens.etsmtl.ca',
          code: 'PERN06049400',
          groupe: '10',

        }
      ];
    },
  },
};

</script>

<style lang="scss" scoped>

</style>