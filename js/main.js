// window.Event = new Vue();
// or
window.Event = new class {
  constructor() {
    this.vue = new Vue();
  }

  fire(event, data = null) {
    this.vue.$emit(event, data);
  }

  listen(event, callback) {
    this.vue.$on(event, callback);
  }

}

Vue.component('coupon', {
  template: `<input type="text" placeholder="Enter coupon" @blur="onCouponApplied">`,
  methods: {
    onCouponApplied() {
      Event.fire('applied');
    }
  }
});

Vue.component("tabs", {
  template: `
  <div class="container">
  <div class="tabs">
  <ul>
    <li v-for="tab in tabs" :class="{'is-active' : tab.isActive }">
    <a href="#" @click="selectTab(tab)">{{ tab.name }}</a></li>
  </ul>
  </div>

  <div class="tab-details">
    <slot></slot>
  </div>
  </div>`,
  data() {
    return {
      tabs: []
    };
  },
  methods: {
    selectTab(selectTab) {
      this.tabs.forEach(tab => {
        tab.isActive = (tab.name == selectTab.name)
      });
    }
  },
  created() {
    this.tabs = this.$children;
  },

  mounted() {
    console.log(this.$children);
  }
});

Vue.component("tab", {
  props: {
    name: {
      required: true
    },
    selected: { required: false }
  },

  data() {
    return {
      isActive: false
    };
  },
  template: `
    <div v-show="isActive">
    <slot></slot>
    </div>
`
});

Vue.component("modal", {
  props: ["text"],
  template: `
  <div class="modal  is-active is-clipped">
<div class="modal-background"></div>
<div class="modal-content">
  <div class="box">
    <p>
     {{text}}
    </p>
  </div>
</div>
<button class="modal-close is-large" aria-label="close" @click="$emit('close')"></button>
</div>
</div>`,

  data() {
    return {
      isVisible: true
    };
  },

  methods: {
    hideModal() {
      this.isVisible = false;
    }
  }
});

Vue.component("message", {
  props: ["title", "body"],
  template: `
  <div class="container" v-show="isVisible">
  <article class="message">
    <div class="message-header">
    <p>{{ title }}</p>
    <button class="delete" aria-label="delete" @click="hideModal"></button>
  </div>
  <div class="message-body">
  {{body}}
  </div>
</article>
</div>`,

  data() {
    return {
      isVisible: true
    };
  },

  methods: {
    hideModal() {
      this.isVisible = false;
    }
  }
});

Vue.component("task-list", {
  template: `<div><task v-for="task in tasks">{{ task.description }}</task></div>`,
  data() {
    return {
      tasks: [
        { description: "go up", completed: true },
        { description: "go down", completed: false },
        { description: "go right", completed: true }
      ]
    };
  }
});

Vue.component("task", {
  template: "<li><slot></slot></li>"
});

new Vue({
  el: "#app",
  data: {
    message: "Hello world",
    newName: "",
    names: ["Harshith", "Omshree", "Vinyas"],
    title: "You just hovered over me",
    className: "color",
    isLoading: false,
    showModal: false,
    CouponApplied: false,
    tasks: [
      { description: "go up", completed: true },
      { description: "go down", completed: false },
      { description: "go right", completed: true }
    ]
  },
  methods: {
    addName() {
      this.names.push(this.newName);
      this.newName = "";
    },
    toggleClass() {
      this.isLoading = true;
    },
    onCouponApplied() {
      alert('Applied');
      this.CouponApplied = true
    }
  },
  computed: {
    reversedMsg() {
      return this.message
        .split("")
        .reverse()
        .join("");
    },
    incompleteTasks() {
      return this.tasks.filter(task => !task.completed);
    }
  },
  mounted() {
    console.log('ready');
  },
  created() {
    Event.listen('applied', () => alert('Handling it'))
  }
});
