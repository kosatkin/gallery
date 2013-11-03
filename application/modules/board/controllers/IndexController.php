<?php

class Board_IndexController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
        $model = new Board_Model_Folder(Zend_Controller_Front::getInstance());
        $this->view->dirs = $model->readDir('D:\\');
    }
}