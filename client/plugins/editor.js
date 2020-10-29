import Vue from 'vue' 
import VueQuillEditor from 'vue-quill-editor'

Vue.use(VueQuillEditor, { 
    placeholder: 'Nhập văn bản...',
    readOnly: true,
    theme: 'snow',
    formats: [
        'bold','strike','italic','code-block','align','size',
        'color', 'list', 'blockquote', 'link' ,'image'
    ],
    modules: {
        toolbar:  {
            container: [
                ['bold', 'italic', 'strike'],
                [{ size: [ 'small', false, 'large'  ]}],
                [{ 'align': [] }, { 'color': [] }],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['link', 'image']
            ],
            handlers: {
                image: function() {
                    document.getElementById('file').click()
                }
            }
        },
        
    }
})