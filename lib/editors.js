/* @flow */

import { CompositeDisposable } from 'sb-event-kit'
import type { TextEditor } from 'atom'
import Editor from './editor'

export default class Editors {
  editors: Map<TextEditor, Editor>;
  subscriptions: CompositeDisposable;

  constructor() {
    this.editors = new Map()
    this.subscriptions = new CompositeDisposable()
  }
  activate() {
    this.subscriptions.add(atom.workspace.observeTextEditors((textEditor) => {
      const editor = new Editor(textEditor)
      editor.onDidDestroy(() => {
        this.editors.delete(textEditor)
        this.subscriptions.delete(editor)
      })
      this.editors.set(textEditor, editor)
      this.subscriptions.add(editor)
    }))
  }
  dispose() {
    this.editors.clear()
    this.subscriptions.dispose()
  }
}
