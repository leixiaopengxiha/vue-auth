import Mock from "mockjs";

function auth() {
    return {
        rules: {
            // 路由权限
            page: {
                home: true,
                home_index: true,
                home_index1: true,
                about: true,
                argu: true,
                count_to: true,
                menu_page: true,
                upload: true,
                form: true,
                folder_tree: true,
                table_page: true,
                render_page: true,
                split_pane: true,
                parent: true,
                child: true,
                named_view: true,
                store: true,
                main: true
            },
            // 组件权限
            component: {
                edit_button: true,
                publish_button: false
            }
        }
    };
}
Mock.setup({
    timeout: 1000
});

Mock.mock(/\/auth/, auth);