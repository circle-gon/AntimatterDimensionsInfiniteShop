var modalCloudConflictMixin = {
    computed: {
        conflict: function() {
            return this.view.modal.cloudConflicts[0];
        }
    },
    methods: {
        handleClick: function(accepted) {
            let conflicts = this.view.modal.cloudConflicts;
            if (accepted) {
                safeCall(this.conflict.onAccept);
            }
            if (conflicts.length === 1){
                safeCall(this.conflict.onLastConflict);
                ui.hideModal();
            }
            conflicts.shift();
        }
    }
};

Vue.component('modal-cloud-save-conflict', {
    mixins: [modalCloudConflictMixin],
    props: ['view'],
    template:
        '<div class="modal-options">\
            <strong>Your local save appears to be older than your cloud save. Would you like to overwrite the cloud save?</strong>\
            <modal-cloud-conflict-record :view="conflict.local" :saveId="conflict.saveId" saveType="local"></modal-cloud-conflict-record>\
            <modal-cloud-conflict-record :view="conflict.cloud" :saveId="conflict.saveId" saveType="cloud"></modal-cloud-conflict-record>\
            <primary-button @click="handleClick(true)">Yes</primary-button>\
            <primary-button @click="handleClick(false)">No</primary-button>\
        </div>'
});

Vue.component('modal-cloud-load-conflict', {
    mixins: [modalCloudConflictMixin],
    props: ['view'],
    template:
        '<div class="modal-options">\
            <strong>Your cloud save appears to be older than your local save. Please select which one you would like to keep.</strong>\
            <modal-cloud-conflict-record :view="conflict.local" :saveId="conflict.saveId" saveType="local">\
                <primary-button @click="handleClick(false)">Load local</primary-button>\
            </modal-cloud-conflict-record>\
            <modal-cloud-conflict-record :view="conflict.cloud" :saveId="conflict.saveId" saveType="cloud">\
                <primary-button @click="handleClick(true)">Load cloud</primary-button>\
            </modal-cloud-conflict-record>\
        </div>'
});

Vue.component('modal-cloud-conflict-record', {
    props: {
        saveId: Number,
        view: Object,
        saveType: String
    },
    template:
        '<div>\
            <strong>Save #{{ saveId + 1 }} ({{ saveType }}):</strong>\
            <span>Infinities: {{ view.infinities }}</span>\
            <span>Eternities: {{ view.eternities }}</span>\
            <slot></slot>\
        </div>'
});