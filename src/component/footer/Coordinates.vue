<template>
  <div>
    <table class="table table-striped">
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th>Permanent Code</th>
      </tr>
      <tr v-for="student in studentMembers" :key="student.code">
        <td v-for="value in student" :key="value">
          {{ value }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  computed: {
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
}
</style>